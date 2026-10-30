import AdvancedCascadedPeltierSim from "./sim.js"
/**
 * Peltier Optimization Submodule
 * Sweeps operating current to find peak performance metrics.
 */
const PeltierOptimizer = (function() {
    return {
        /**
         * Finds the optimal operating current for a specific load and hot-side condition
         * @param {number} Th_C - Fixed Hot-Side temperature in Celsius
         * @param {number} Qc_load - Active heat load on the cold terminal in Watts
         * @returns {Object} Optimization analysis report
         */
        findOptimalCurrent: function(Th_C, Qc_load) {
            let bestCurrent = 0;
            let lowestTCold = Infinity;
            let correspondingState = null;

            // Sweep current from 0.1 A to 3.5 A in precise 0.05 A increments
            for (let I = 0.1; I <= 3.5; I += 0.05) {
                // Ensure current value avoids floating-point tracking artifacts
                const roundedCurrent = parseFloat(I.toFixed(2));
                
                // Execute simulation step using the advanced temperature-dependent engine
                const state = AdvancedCascadedPeltierSim.simulate(Th_C, roundedCurrent, Qc_load);
                
                // Track the point where the cold side dips to its minimum value
                if (state.T_cold_C < lowestTCold) {
                    lowestTCold = state.T_cold_C;
                    bestCurrent = roundedCurrent;
                    correspondingState = state;
                }
            }

            return {
                target_conditions: {
                    hot_side_temperature_C: Th_C,
                    applied_heat_load_W: Qc_load
                },
                optimization_results: {
                    optimal_current_A: bestCurrent,
                    minimum_achievable_T_cold_C: lowestTCold,
                    maximum_achievable_dT_C: correspondingState.total_dT_C,
                    required_voltage_drop_V: correspondingState.electrical_measurements.total_voltage_drop_V,
                    total_power_consumption_W: correspondingState.electrical_measurements.power_input_W,
                    system_cop_at_optimum: correspondingState.coefficient_of_performance,
                    interstage_junction_temp_C: correspondingState.T_interstage_C
                }
            };
        }
    };
})();

// ============================================================================
// OPTIMIZATION SWEEP DEMO RUN
// ============================================================================
// Example: Find the optimal current to maintain a 1.5 Watt sensor load with a 27°C hot plate
const optReport = PeltierOptimizer.findOptimalCurrent(-10, 0.5);

console.log("=== CASCADE CURRENT OPTIMIZATION REPORT ===");
console.log(JSON.stringify(optReport, null, 2));

