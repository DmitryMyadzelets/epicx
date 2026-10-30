/**
 * Advanced Two-Stage Cascaded Peltier Module Simulation Engine
 * Accounts for changing S, R, and K profiles across local temperature gradients.
 */
const AdvancedCascadedPeltierSim = (function() {
    // Structural layout constraints provided by user
    const N_top = 60;
    const N_bottom = 129;

    /**
     * Calculates the temperature-dependent material micro-constants 
     * for a single Bismuth Telluride couple at a given local Kelvin temperature.
     */
    function getCoupleProperties(T_kelvin) {
        const dT_ref = T_kelvin - 300.15; // Shift from baseline reference room temp (27°C)
        
        return {
            s: (410.0 + 0.85 * dT_ref) * 1e-6,  // Seebeck scaling (V/K)
            r: (8.1 + 0.026 * dT_ref) * 1e-3,   // Internal electrical resistance scaling (Ohm)
            k: (25.0 + 0.022 * dT_ref) * 1e-3   // Parasitic thermal conductance leak (W/K)
        };
    }

    return {
        /**
         * Simulates the thermal and electrical state of the multi-stage system
         * @param {number} Th_C - Fixed Hot-Side temperature in Celsius
         * @param {number} I - Balanced operating current in Amperes
         * @param {number} Qc_load - Active heat load on the cold terminal in Watts
         * @returns {Object} Full physical state breakdown of the running module
         */
        simulate: function(Th_C, I, Qc_load) {
            const Th = Th_C + 273.15;

            // Seed initial temperature guesses to start convergence mapping
            let T_inter = Th - 30.0;
            let T_cold = T_inter - 30.0;

            // Tracking variables for localized properties inside the convergence loop
            let S_top, R_top, K_top;
            let S_bottom, R_bottom, K_bottom;

            // Numerical iteration loop to find thermal balance equilibrium
            for (let iter = 0; iter < 30; iter++) {
                // Compute local absolute mean junction temperature windows
                const T_avg_top = (T_cold + T_inter) / 2.0;
                const T_avg_bottom = (T_inter + Th) / 2.0;

                // Query dynamic properties evaluated at local stage mean temperatures
                const top_mat = getCoupleProperties(T_avg_top);
                const bot_mat = getCoupleProperties(T_avg_bottom);

                // Compile systemic macro properties for each decoupled tier
                S_top = N_top * top_mat.s;
                R_top = N_top * top_mat.r;
                K_top = N_top * top_mat.k;

                S_bottom = N_bottom * bot_mat.s;
                R_bottom = N_bottom * bot_mat.r;
                K_bottom = N_bottom * bot_mat.k;

                const P_joule_top = 0.5 * I * I * R_top;
                const P_joule_bottom = 0.5 * I * I * R_bottom;

                // Solve the implicit node interaction balance
                const numerator = (Qc_load + P_joule_top) * (S_top * I - K_top) / (S_top * I + K_top) 
                                  + P_joule_top + P_joule_bottom + K_bottom * Th;
                                  
                const denominator = K_bottom + S_bottom * I - S_top * I + K_top 
                                    + (K_top * (S_top * I - K_top) / (S_top * I + K_top));

                const next_T_inter = numerator / denominator;
                const next_T_cold = (Qc_load + P_joule_top + K_top * next_T_inter) / (S_top * I + K_top);

                // Exit immediately if temperatures stabilize to within 0.0001 Kelvin
                if (Math.abs(next_T_inter - T_inter) < 1e-4 && Math.abs(next_T_cold - T_cold) < 1e-4) {
                    T_inter = next_T_inter;
                    T_cold = next_T_cold;
                    break;
                }

                T_inter = next_T_inter;
                T_cold = next_T_cold;
            }

            // --- ELECTRICAL PROFILE POST-SOLVE CALCULATION ---
            // Total electrical voltage drop accounts for pure ohmic drop plus Seebeck EMF feedback
            const Voltage_Ohmic = I * (R_top + R_bottom);
            const Voltage_Seebeck = (S_top * (T_inter - T_cold)) + (S_bottom * (Th - T_inter));
            const Total_Voltage = Voltage_Ohmic + Voltage_Seebeck;
            
            const Power_Input = Total_Voltage * I;
            const COP = Qc_load / Power_Input;

            return {
                input_current_A: I,
                applied_load_W: Qc_load,
                T_hot_C: Th_C,
                T_interstage_C: parseFloat((T_inter - 273.15).toFixed(1)),
                T_cold_C: parseFloat((T_cold - 273.15).toFixed(1)),
                total_dT_C: parseFloat((Th - T_cold).toFixed(1)),
                stage_dT_breakdown: {
                    top_stage_dT_C: parseFloat((T_inter - T_cold).toFixed(1)),
                    bottom_stage_dT_C: parseFloat((Th - T_inter).toFixed(1))
                },
                electrical_measurements: {
                    total_voltage_drop_V: parseFloat(Total_Voltage.toFixed(2)),
                    voltage_breakdown: {
                        ohmic_V: parseFloat(Voltage_Ohmic.toFixed(2)),
                        seebeck_back_emf_V: parseFloat(Voltage_Seebeck.toFixed(2))
                    },
                    power_input_W: parseFloat(Power_Input.toFixed(2))
                },
                coefficient_of_performance: parseFloat(COP.toFixed(3))
            };
        }
    };
})();

// ============================================================================
// SIMULATION DEMO RUN
// ============================================================================
// Let's run a test simulation under a 2 Watt load at 1.2 Amperes, hot plate at 27°C
const results = AdvancedCascadedPeltierSim.simulate(27, 1.2, 2.0);

console.log("=== TEMPERATURE-DEPENDENT CASCADE PERFORMANCE RESULTS ===");
console.log(JSON.stringify(results, null, 2));

export default AdvancedCascadedPeltierSim

