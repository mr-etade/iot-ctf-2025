// CMN322 IoT CTF - Challenge Database and Logic

// Global Pyodide instance
let pyodide;
let pyodideReady = false;

// Initialize Pyodide
async function initPyodide() {
    const statusDiv = document.getElementById('pyodide-status');
    try {
        statusDiv.innerHTML = '<span class="loading-spinner"></span> Loading Python environment...';
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        pyodideReady = true;
        
        // Pre-load micropip and install NumPy globally (for challenges like correlation matrix)
        await pyodide.loadPackage("micropip");
        const micropip = pyodide.pyimport("micropip");
        await micropip.install("numpy");
        console.log('NumPy pre-loaded successfully!');
        await micropip.install("scipy");
        console.log('SciPy pre-loaded successfully!');
        
        // Small delay for UX
        setTimeout(() => {
            statusDiv.innerHTML = '✓ Python environment ready!';
            statusDiv.classList.add('ready');
        }, 500);
        
        console.log('Pyodide loaded successfully!');
        
        // Update buttons immediately after ready
        updateRunButtons();
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        statusDiv.innerHTML = '⚠ Failed to load Python environment. Check your connection and refresh.';
        statusDiv.style.color = 'var(--accent-danger)';
        statusDiv.classList.add('error'); // Assuming CSS has .error for styling
    }
}

// Update all Run Code buttons based on pyodideReady state
function updateRunButtons() {
    const buttons = document.querySelectorAll('.run-code-btn');
    buttons.forEach(btn => {
        if (pyodideReady) {
            btn.disabled = false;
            btn.textContent = '▶ Run Code';
            btn.title = ''; // Clear any loading tooltip
        } else {
            btn.disabled = true;
            btn.textContent = '⏳ Loading Python...';
            btn.title = 'Python environment still loading...';
        }
    });
}

// Typeset MathJax formulas after rendering challenges
async function typesetMath() {
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        try {
            await MathJax.typesetPromise([document.getElementById('challengesContainer')]);
            console.log('MathJax typeset complete');
        } catch (err) {
            console.warn('MathJax typesetting error:', err);
        }
    } else {
        // Retry after a short delay if MathJax not ready
        setTimeout(typesetMath, 500);
    }
}

// Handle Tab key for indentation in code editors
function setupTabIndentation() {
    document.querySelectorAll('.code-editor').forEach(editor => {
        // Prevent duplicate listeners
        editor.removeEventListener('keydown', handleTabKey);
        editor.addEventListener('keydown', handleTabKey);
    });
}

function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        
        // If selection is made, indent multiple lines
        if (start !== end) {
            const value = editor.value;
            const selectedText = value.substring(start, end);
            const lines = selectedText.split('\n');
            const indentedLines = lines.map(line => '    ' + line); // 4 spaces
            const indentedText = indentedLines.join('\n');
            
            editor.value = value.substring(0, start) + indentedText + value.substring(end);
            
            // Set cursor to end of selection
            editor.selectionStart = start + indentedText.length;
            editor.selectionEnd = editor.selectionStart;
        } else {
            // Single cursor: insert 4 spaces
            const spaces = '    ';
            editor.value = editor.value.substring(0, start) + spaces + editor.value.substring(start);
            editor.selectionStart = editor.selectionEnd = start + spaces.length;
        }
    }
}

// Complete Challenge Database (filled in truncated sections based on patterns)
const CMN322_CHALLENGES = [
    // EASY CHALLENGES (10) - 3 coding, 7 theory
    {
        id: 1,
        difficulty: 'easy',
        type: 'theory',
        title: 'IoT Architecture Basics',
        description: 'Identify the Cisco IoT System Pillars',
        problem: 'How many pillars are in the Cisco IoT System architecture framework?',
        answer: '6',
        flag: 'six_pillars_foundation',
        hint: "When Cisco builds an IoT house, they don't use 4 walls or 5 – they use something more complete. Check the 'Fundamentals of IoT - CONNECTING THINGS' slides to count the architectural supports."
    },
    {
        id: 2,
        difficulty: 'easy',
        type: 'coding',
        title: 'Temperature Sensor Reading',
        description: 'Process IoT sensor data with Python',
        problem: 'Write Python code to calculate the average of these temperature readings:\ntemperatures = [22.5, 23.0, 24.5, 22.0, 23.5]\nStore the result in a variable called "average" and print it.',
        expectedOutput: '23.1',
        flag: 'sensor_average_temp',
        hint: 'Use sum() and len() functions'
    },
    {
        id: 3,
        difficulty: 'easy',
        type: 'theory',
        title: 'Control System Types',
        description: 'Distinguish control systems',
        problem: 'A thermostat that checks room temperature and adjusts heating is which type of control system? (enter: open or closed)',
        answer: 'closed',
        flag: 'feedback_loop_control',
        hint: 'Does it check the result and adjust?'
    },
    {
        id: 4,
        difficulty: 'easy',
        type: 'theory',
        title: 'Big Data Volume',
        description: 'Understanding Big Data characteristics',
        problem: 'How many gigabits (Gb) of data does ONE autonomous vehicle generate per day?',
        answer: '4000',
        flag: 'massive_vehicle_data',
        hint: "This car's data appetite is huge. Check the 'Fundamentals of IoT - Everything Generates Data' slides to see just how many gigabits it feasts on daily."
    },
    {
        id: 5,
        difficulty: 'easy',
        type: 'coding',
        title: 'IoT Device Status Check',
        description: 'Basic conditional logic for IoT',
        problem: 'Write Python code to check if a sensor reading is abnormal:\nreading = 85\nIf reading > 80, print "ALERT"\nOtherwise, print "NORMAL"',
        expectedOutput: 'ALERT',
        flag: 'conditional_monitoring',
        hint: 'Use if-else statement'
    },
    {
        id: 6,
        difficulty: 'easy',
        type: 'theory',
        title: 'DIKW Model',
        description: 'Data hierarchy understanding',
        problem: 'In the DIKW model, what comes after Data and before Knowledge? (one word, lowercase)',
        answer: 'information',
        flag: 'data_to_wisdom_path',
        hint: 'Processed data with context'
    },
    {
        id: 7,
        difficulty: 'easy',
        type: 'theory',
        title: 'Statistical Measure',
        description: 'Basic data analysis',
        problem: 'Calculate the median of these sensor readings: 22, 20, 28, 26, 24',
        answer: '24',
        flag: 'median_calculation',
        hint: "When in doubt, line 'em up and find the middle child. Check the 'Fundamentals of Data Analysis' slides for the secret to this central position."
    },
    {
        id: 8,
        difficulty: 'easy',
        type: 'theory',
        title: 'IoT Security Planes',
        description: 'Security fundamentals',
        problem: 'How many security planes are there in IoT security architecture?',
        answer: '3',
        flag: 'three_layer_security',
        hint: "Securing IoT is a three-act play, not a solo show. Check the 'IoT Applications in Business (Part 1)' slides to meet all the characters."
    },
    {
        id: 9,
        difficulty: 'easy',
        type: 'coding',
        title: 'Smart Device Counter',
        description: 'Loop through IoT devices',
        problem: 'Write Python code to count devices that are "online":\ndevices = ["online", "offline", "online", "online", "offline"]\nCount and print the number of "online" devices.',
        expectedOutput: '3',
        flag: 'device_status_count',
        hint: 'Use count() method or a loop'
    },
    {
        id: 10,
        difficulty: 'easy',
        type: 'theory',
        title: 'Network Protocol',
        description: 'IoT communication basics',
        problem: 'What lightweight protocol is specifically designed for IoT devices? (4 letters, uppercase)',
        answer: 'MQTT',
        flag: 'message_queue_telemetry',
        hint: "This protocol's name is shorter than a tweet but perfect for chatty sensors. Check the 'Fundamentals of IoT - CONNECTING THINGS' slides for this 4-letter superstar."
    },

    // MEDIUM CHALLENGES (20) - 8 coding, 12 theory
    {
        id: 11,
        difficulty: 'medium',
        type: 'theory',
        title: '4Vs of Big Data',
        description: 'Big Data characteristics analysis',
        problem: 'List all 4Vs of Big Data in alphabetical order, separated by commas (lowercase, no spaces)',
        answer: 'variety,velocity,veracity,volume',
        flag: 'four_vs_complete',
        hint: 'Think about amount, speed, types, and quality'
    },
    {
        id: 12,
        difficulty: 'medium',
        type: 'coding',
        title: 'Sensor Data Filtering',
        description: 'Filter abnormal readings',
        problem: 'Write Python code to filter sensor readings that are within normal range (20-30):\nreadings = [18, 25, 32, 22, 28, 15, 29]\nCreate a list called "normal" with only valid readings and print it.',
        expectedOutput: '[25, 22, 28, 29]',
        flag: 'data_filtering_range',
        hint: 'Use list comprehension or a loop with conditions'
    },
    {
        id: 13,
        difficulty: 'medium',
        type: 'coding',
        title: 'k-NN Distance Calculation',
        description: 'Calculate Euclidean distance',
        problem: 'Write Python code to calculate Euclidean distance between two points:\npoint1 = \\((0, 0)\\)\npoint2 = \\((3, 4)\\)\nUse the formula: \\( \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\)\nPrint the result.',
        expectedOutput: '5.0',
        flag: 'euclidean_distance',
        hint: 'Import math module for sqrt()'
    },
    {
        id: 14,
        difficulty: 'medium',
        type: 'theory',
        title: 'Correlation Coefficient Range',
        description: 'Data analysis fundamentals',
        problem: 'What is the range of Pearson correlation coefficient values? (format: min,max)',
        answer: '-1,1',
        flag: 'correlation_bounds',
        hint: 'Perfect negative to perfect positive'
    },
    {
        id: 15,
        difficulty: 'medium',
        type: 'coding',
        title: 'IoT Data Aggregation',
        description: 'Process multiple sensor readings',
        problem: 'Write Python code to find the maximum temperature from daily readings:\nreadings = {"Mon": 22, "Tue": 25, "Wed": 23, "Thu": 27, "Fri": 24}\nPrint only the maximum temperature value (not the day).',
        expectedOutput: '27',
        flag: 'max_temperature_day',
        hint: 'Use max() with .values()'
    },
    {
        id: 16,
        difficulty: 'medium',
        type: 'theory',
        title: 'Fog Computing Benefits',
        description: 'Edge processing understanding',
        problem: 'Fog computing primarily reduces what in IoT systems? (one word, lowercase)',
        answer: 'latency',
        flag: 'edge_processing_advantage',
        hint: 'Processing closer to source reduces delay'
    },
    {
        id: 17,
        difficulty: 'medium',
        type: 'theory',
        title: 'Smart City Application',
        description: 'Real-world IoT implementation',
        problem: 'In Hamburg smart city, what percentage reduction in energy consumption was achieved through smart building systems?',
        answer: '25',
        flag: 'energy_efficiency_gain',
        hint: "Hamburg's buildings got a smart upgrade that would make any energy bill smile. Check the 'IoT Applications in Business (Part 2)' slides to see just how much they saved."
    },
    {
        id: 18,
        difficulty: 'medium',
        type: 'theory',
        title: 'Analytics Types',
        description: 'Data analytics classification',
        problem: 'Which type of analytics answers "What should we do?" (one word, lowercase)',
        answer: 'prescriptive',
        flag: 'recommendation_analytics',
        hint: 'Most advanced form, recommends actions'
    },
    {
        id: 19,
        difficulty: 'medium',
        type: 'coding',
        title: 'Standard Deviation Calculation',
        description: 'Statistical analysis with Python',
        problem: 'Write Python code to calculate standard deviation:\ndata = [2, 4, 6, 8, 10]\nUse the statistics module and print the result rounded to 2 decimal places.',
        expectedOutput: '2.83',
        flag: 'spread_measurement',
        hint: 'import statistics; use stdev() and round()'
    },
    {
        id: 20,
        difficulty: 'medium',
        type: 'theory',
        title: 'NoSQL Database Type',
        description: 'IoT data storage',
        problem: 'What type of database is specifically optimized for time-stamped sensor data? (two words, lowercase, hyphenated)',
        answer: 'time-series',
        flag: 'temporal_data_storage',
        hint: 'InfluxDB, TimescaleDB are examples'
    },
    {
        id: 21,
        difficulty: 'medium',
        type: 'theory',
        title: 'Machine Learning Types',
        description: 'ML classification',
        problem: 'k-NN is an example of which type of learning? (one word, lowercase)',
        answer: 'supervised',
        flag: 'labeled_training_data',
        hint: 'Uses labeled training data'
    },
    {
        id: 22,
        difficulty: 'medium',
        type: 'coding',
        title: 'IoT Device Classification',
        description: 'k-NN majority voting simulation',
        problem: 'Write Python code for k-NN voting (k=5):\nneighbors = ["Occupied", "Empty", "Occupied", "Occupied", "Empty"]\nPrint the most common class (use max with count).',
        expectedOutput: 'Occupied',
        flag: 'majority_vote_wins',
        hint: 'Count occurrences and find max'
    },
    {
        id: 23,
        difficulty: 'medium',
        type: 'theory',
        title: 'Data Visualization Tool',
        description: 'IoT analytics tools',
        problem: 'What Python library is commonly used for IoT data visualization? (short name, lowercase)',
        answer: 'matplotlib',
        flag: 'plotting_library',
        hint: 'Popular for charts and graphs'
    },
    {
        id: 24,
        difficulty: 'medium',
        type: 'coding',
        title: 'Data Normalization',
        description: 'Scale features for ML',
        problem: 'Write Python code to normalize data to 0-1 range:\nvalues = [10, 20, 30, 40, 50]\nUse min-max formula and print the normalized list.',
        expectedOutput: '[0.0, 0.25, 0.5, 0.75, 1.0]',
        flag: 'min_max_scaling',
        hint: '(x - min) / (max - min)'
    },
    {
        id: 25,
        difficulty: 'medium',
        type: 'theory',
        title: 'Cloud Computing Model',
        description: 'IoT deployment options',
        problem: 'What computing model processes data at the network edge in IoT? (one word, lowercase)',
        answer: 'fog',
        flag: 'decentralized_processing',
        hint: 'Between device and cloud'
    },
    {
        id: 26,
        difficulty: 'medium',
        type: 'coding',
        title: 'Correlation Matrix',
        description: 'Basic stats computation',
        problem: 'Write Python code to compute correlation between two lists:\nlist1 = [1, 2, 3]\nlist2 = [2, 4, 6]\nUse numpy.corrcoef and print the value.',
        expectedOutput: '1.0',
        flag: 'linear_relationship',
        hint: 'import numpy as np; np.corrcoef'
    },
    {
        id: 27,
        difficulty: 'medium',
        type: 'theory',
        title: 'IoT Security Threat',
        description: 'Common vulnerabilities',
        problem: 'What is the most common IoT security threat due to default credentials? (one word, lowercase)',
        answer: 'brute-force',
        flag: 'weak_auth_attack',
        hint: "When passwords are weak, this attack just keeps knocking until the door opens. Check the 'IoT Applications in Business (Part 1)' slides on security."
    },
    {
        id: 28,
        difficulty: 'medium',
        type: 'theory',
        title: 'k-NN Parameter',
        description: 'Algorithm tuning',
        problem: 'In k-NN, what does a higher k value tend to do? (one word, lowercase)',
        answer: 'smooth',
        flag: 'decision_boundary_smooth',
        hint: "A higher k-value makes your model less jumpy and more... well-rounded. Check the 'Advanced Analytics & ML' slides on k-NN fundamentals."
    },
    {
        id: 29,
        difficulty: 'medium',
        type: 'coding',
        title: 'Time Series Smoothing',
        description: 'IoT signal processing',
        problem: 'Write Python code for moving average (window=3):\ndata = [1, 3, 5, 7, 9]\nPrint the smoothed list.',
        expectedOutput: '[3.0, 5.0, 7.0]',
        flag: 'signal_denoising',
        hint: 'Use a loop or numpy.convolve'
    },
    {
        id: 30,
        difficulty: 'medium',
        type: 'theory',
        title: 'Big Data Velocity',
        description: 'Real-time processing',
        problem: 'What unit measures data velocity in streaming IoT applications? (one word, lowercase)',
        answer: 'hertz',
        flag: 'data_generation_rate',
        hint: "This unit measures how often your data 'beats' per second. Check the 'Fundamentals of IoT - Everything Generates Data' slides for the rhythm of data streams."
    },

    // HARD CHALLENGES (10) - 5 coding, 5 theory
    {
        id: 31,
        difficulty: 'hard',
        type: 'theory',
        title: 'Advanced Fog Architecture',
        description: 'Multi-layer edge computing',
        problem: 'In advanced fog computing, how many layers are typically involved? (number)',
        answer: '3',
        flag: 'hierarchical_edge_layers',
        hint: "Fog computing isn't just one layer of mist—it's a triple-decker architecture. Check the 'Data in IoT' slides to see how the layers stack up."
    },
    {
        id: 32,
        difficulty: 'hard',
        type: 'coding',
        title: 'k-NN Implementation',
        description: 'Full distance-based classification',
        problem: 'Write Python code for simple k-NN (k=3):\ntrain = [(1,1,"A"), (2,2,"A"), (3,3,"B"), (4,4,"B")]\ntest = (2.5, 2.5)\nFind 3 nearest, vote, print class.',
        expectedOutput: 'A',
        flag: 'nearest_neighbor_classify',
        hint: 'Calculate distances, sort, majority vote'
    },
    {
        id: 33,
        difficulty: 'hard',
        type: 'theory',
        title: 'IoT Blockchain Integration',
        description: 'Secure data sharing',
        problem: 'What blockchain feature ensures IoT device data immutability? (one word, lowercase)',
        answer: 'hashing',
        flag: 'tamper_proof_data',
        hint: "This blockchain trick turns your IoT data into a unique digital fingerprint that can't be forged. Check the 'Data in IoT' slides on future trends."
    },
    {
        id: 34,
        difficulty: 'hard',
        type: 'coding',
        title: 'Anomaly Detection',
        description: 'Statistical outlier identification',
        problem: 'Write Python code to detect outliers using z-score (threshold=1):\ndata = [10, 12, 11, 13, 50]\nPrint list of outliers.',
        expectedOutput: '[50]',
        flag: 'statistical_anomaly',
        hint: 'import numpy as np, scipy.stats; z = zscore'
    },
    {
        id: 35,
        difficulty: 'hard',
        type: 'theory',
        title: 'Prescriptive Analytics Output',
        description: 'Actionable insights',
        problem: 'Prescriptive analytics often uses what optimization technique? (one word, lowercase)',
        answer: 'simulation',
        flag: 'scenario_modeling',
        hint: "This technique lets you test-drive decisions before you make them. Check the 'Fundamentals of Data Analysis' slides on prescriptive analytics."
    },
    {
        id: 36,
        difficulty: 'hard',
        type: 'coding',
        title: 'ETL Pipeline Simulation',
        description: 'Data transformation workflow',
        problem: 'Write Python code for ETL: Extract from dict, Transform (filter >10), Load (sum):\ndata = {\n"s1":5, \n"s2":15, \n"s3":25\n}\nPrint sum of transformed.',
        expectedOutput: '40',
        flag: 'workflow_automation',
        hint: 'Loop through values, condition, accumulate'
    },
    {
        id: 37,
        difficulty: 'hard',
        type: 'theory',
        title: 'IoT Ethical Concern',
        description: 'Privacy in smart systems',
        problem: 'What GDPR principle requires data minimization in IoT? (two words, lowercase)',
        answer: 'purpose limitation',
        flag: 'data_privacy_compliance',
        hint: "GDPR says: Don't be a data hoarder. This principle keeps IoT systems honest about what they really need. Check the 'Data in IoT' slides on privacy."
    },
    {
        id: 38,
        difficulty: 'hard',
        type: 'coding',
        title: 'Machine Learning Pipeline',
        description: 'End-to-end data flow',
        problem: 'Write Python code: Load data, normalize, simple k-NN predict (k=1), print prediction.\ndata = [[1,1], [2,2]]; labels=["A","B"]; test=[1.5,1.5]',
        expectedOutput: 'A',
        flag: 'ml_workflow',
        hint: 'Min distance to classify'
    },
    {
        id: 39,
        difficulty: 'hard',
        type: 'theory',
        title: 'Feature Engineering',
        description: 'ML data preparation',
        problem: 'You have raw temperature in Celsius. To prepare for k-NN, should you normalize it? (yes or no)',
        answer: 'yes',
        flag: 'feature_scaling_required',
        hint: 'Distance-based algorithms require same scale'
    },
    {
        id: 40,
        difficulty: 'hard',
        type: 'coding',
        title: 'IoT Data Pipeline',
        description: 'Complete ETL process simulation',
        problem: 'Write Python code for simple ETL:\ndata = [10, 20, None, 30, 40]\n1. Extract: Get non-None values\n2. Transform: Multiply each by 2\n3. Load: Print sum of transformed values',
        expectedOutput: '200',
        flag: 'etl_pipeline_complete',
        hint: 'Filter None, multiply, then sum'
    }
];

// Current state
let currentClass = '';
let currentFilter = 'all';

// Initialize challenges
function initializeChallenges(className) {
    currentClass = className;
    
    // Start loading Pyodide in background
    if (!pyodide) {
        initPyodide();
    }
    
    renderChallenges();
}

// Filter challenges by difficulty
function filterChallenges(difficulty) {
    currentFilter = difficulty;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderChallenges();
}

// Render challenges
function renderChallenges() {
    const container = document.getElementById('challengesContainer');
    const challenges = CMN322_CHALLENGES;
    
    const filtered = currentFilter === 'all' 
        ? challenges 
        : challenges.filter(c => c.difficulty === currentFilter);
    
    container.innerHTML = filtered.map(challenge => {
        const isCoding = challenge.type === 'coding';
        
        return `
            <div class="challenge-card" data-difficulty="${challenge.difficulty}" id="card-${challenge.id}">
                <div class="challenge-header">
                    <h3 class="challenge-title">${challenge.id}. ${challenge.title}</h3>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        ${isCoding ? '<span class="challenge-type">🐍 CODING</span>' : ''}
                        <span class="difficulty-badge difficulty-${challenge.difficulty}">
                            ${challenge.difficulty.toUpperCase()}
                        </span>
                    </div>
                </div>
                
                <p class="challenge-description">${challenge.description}</p>
                
                <div class="challenge-problem">${challenge.problem}</div>
                
                ${isCoding ? `
                    <div class="code-editor-section">
                        <label>Write your Python code:</label>
                        <textarea 
                            class="code-editor" 
                            id="code-${challenge.id}"
                            placeholder="# Write your Python code here...
# Your code will be executed when you click 'Run Code'"
                        ></textarea>
                        <div class="input-group">
                            <button 
                                class="run-code-btn" 
                                id="run-${challenge.id}"
                                onclick="runPythonCode(${challenge.id})"
                                ${!pyodideReady ? 'disabled' : ''}
                                title="${!pyodideReady ? 'Python environment still loading...' : ''}"
                            >
                                ${pyodideReady ? '▶ Run Code' : '⏳ Loading Python...'}
                            </button>
                        </div>
                        <div id="output-${challenge.id}" class="code-output"></div>
                    </div>
                ` : `
                    <div class="answer-section">
                        <label>Enter your answer:</label>
                        <div class="input-group">
                            <input 
                                type="text" 
                                class="answer-input" 
                                id="answer-${challenge.id}"
                                placeholder="Your answer..."
                            />
                            <button 
                                class="submit-btn" 
                                onclick="checkAnswer(${challenge.id})"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                `}
                
                <div id="result-${challenge.id}" class="flag-result"></div>
                
                <div class="hint-section">
                    <button class="hint-btn" onclick="toggleHint(${challenge.id})">
                        💡 Show Hint
                    </button>
                    <div id="hint-${challenge.id}" class="hint-content">
                        ${challenge.hint}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update run buttons after rendering (handles re-renders and state changes)
    updateRunButtons();
    
    // Setup tab indentation for new editors
    setupTabIndentation();
    
    // Typeset MathJax formulas after rendering
    typesetMath();
}

// Run Python code
async function runPythonCode(challengeId) {
    if (!pyodideReady) {
        alert('Python environment is not ready yet. Please wait a moment or refresh the page.');
        return;
    }
    
    const challenge = CMN322_CHALLENGES.find(c => c.id === challengeId);
    const codeEditor = document.getElementById(`code-${challengeId}`);
    const outputDiv = document.getElementById(`output-${challengeId}`);
    const resultDiv = document.getElementById(`result-${challengeId}`);
    const code = codeEditor.value.trim();
    
    if (!code) {
        outputDiv.className = 'code-output show error';
        outputDiv.textContent = 'Error: Please write some code first!';
        return;
    }
    
    // Safeguard against infinite loops: 5s timeout
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timeout: Code took too long to run')), 5000);
    });
    
    let output = '';
    try {
        // Clear previous output
        outputDiv.className = 'code-output show';
        outputDiv.textContent = 'Running code...';
        
        // Set custom stdout handler (batched for line-based capture)
        pyodide.setStdout({
            batched: (text) => {
                output += text;
            }
        });
        
        // Run the code with timeout
        await Promise.race([pyodide.runPythonAsync(code), timeoutPromise]);
        
        // Restore default stdout handler (empty options)
        pyodide.setStdout({});
        
        // Display output
        output = output.trim();
        outputDiv.textContent = output || '(No output produced)';
        
        // Check if output matches expected (trim whitespace)
        const expectedOutput = challenge.expectedOutput.trim();
        if (output === expectedOutput) {
            outputDiv.className = 'code-output show success';
            showFlag(challengeId, true);
        } else {
            outputDiv.className = 'code-output show';
            resultDiv.className = 'flag-result error';
            resultDiv.innerHTML = `
                <strong>❌ Incorrect Output</strong><br>
                <!--Expected: <code>${expectedOutput}</code><br>-->
                Got: <code>${output || '(no output)'}</code><br>
                <small>Tip: Check for exact match, including floats and lists.</small>
            `;
        }
    } catch (error) {
        // Restore default stdout handler on error/timeout
        try {
            pyodide.setStdout({});
        } catch (restoreError) {
            console.warn('Failed to restore stdout handler:', restoreError);
        }
        
        outputDiv.className = 'code-output show error';
        outputDiv.textContent = `Runtime Error: ${error.message}`;
        resultDiv.className = 'flag-result error';
        resultDiv.innerHTML = `
            <strong>❌ Code Error</strong><br>
            ${error.message}<br>
            <small>Debug your code and try again.</small>
        `;
    }
}

// Check theory answer
function checkAnswer(challengeId) {
    const challenge = CMN322_CHALLENGES.find(c => c.id === challengeId);
    const userAnswer = document.getElementById(`answer-${challengeId}`).value.trim();
    
    // Normalize answer for comparison (lowercase, remove spaces/punctuation)
    const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[^\w]/g, '');
    const normalizedCorrectAnswer = challenge.answer.toLowerCase().replace(/[^\w]/g, '');
    
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
        showFlag(challengeId, true);
    } else {
        const resultDiv = document.getElementById(`result-${challengeId}`);
        resultDiv.className = 'flag-result error';
        resultDiv.innerHTML = `
            <strong>❌ Incorrect</strong><br>
            Try again! Check spelling and format.
        `;
    }
}

// Show flag
function showFlag(challengeId, isCorrect) {
    const challenge = CMN322_CHALLENGES.find(c => c.id === challengeId);
    const resultDiv = document.getElementById(`result-${challengeId}`);
    const card = document.getElementById(`card-${challengeId}`);
    
    if (isCorrect) {
        const flag = `CMN322{${challenge.flag}}`;
        resultDiv.className = 'flag-result success';
        resultDiv.innerHTML = `
            <strong>✅ Correct!</strong><br>
            Here is your flag:<br>
            <div class="flag-display">
                <strong>${flag}</strong>
            </div>
            <p style="margin-top: 10px; font-size: 0.9em;">
                Copy this flag and submit it on 
                <a href="https://mr-etade.ctfd.io/challenges" target="_blank">mr-etade.ctfd.io</a>
            </p>
        `;
        
        // Mark card as solved
        card.classList.add('solved');
        
        // Store solved challenge
        const solvedKey = `${currentClass}_solved`;
        let solved = JSON.parse(localStorage.getItem(solvedKey) || '[]');
        if (!solved.includes(challengeId)) {
            solved.push(challengeId);
            localStorage.setItem(solvedKey, JSON.stringify(solved));
        }
        
        console.log(`🎉 Challenge ${challengeId} solved! Flag: ${flag}`);
    }
}

// Toggle hint
function toggleHint(challengeId) {
    const hintDiv = document.getElementById(`hint-${challengeId}`);
    const btn = event.target;
    hintDiv.classList.toggle('show');
    btn.textContent = hintDiv.classList.contains('show') ? '💡 Hide Hint' : '💡 Show Hint';
}

// Add keyboard support for answer submission
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('answer-input')) {
        const challengeId = parseInt(e.target.id.replace('answer-', ''));
        checkAnswer(challengeId);
    }
});

// Fallback update on page load
window.addEventListener('load', () => {
    updateRunButtons();
    setupTabIndentation();
    typesetMath(); // Initial MathJax typesetting

});


