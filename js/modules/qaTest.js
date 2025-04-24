/**
 * Setup Q&A Test functionality
 * - Start test button
 * - Next/Previous navigation
 * - Show results based on user selections
 */
export function setupQATest() {
    const startTestBtn = document.getElementById('start-test-btn');
    const testIntro = document.getElementById('test-intro');
    const testQuestions = document.getElementById('test-questions');
    const testResults = document.getElementById('test-results');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitTestBtn = document.getElementById('submit-test-btn');
    const retakeTestBtn = document.getElementById('retake-test-btn');
    const resultContent = document.getElementById('result-content');
    const testProgress = document.getElementById('test-progress');
    const currentStepEl = document.getElementById('current-step');
    
    // Questions and their elements
    const questions = [
        document.getElementById('question-1'),
        document.getElementById('question-2'),
        document.getElementById('question-3')
    ];
    
    let currentQuestion = 0;
    
    // Start the test
    startTestBtn.addEventListener('click', () => {
        testIntro.classList.add('hidden');
        testQuestions.classList.remove('hidden');
        
        // Show the first question with animation
        questions[0].classList.remove('hidden');
        questions[0].classList.add('animate-fade-in');
        
        updateProgressBar();
    });
    
    // Next button functionality
    nextBtn.addEventListener('click', () => {
        // Check if the current question has a selected option
        const currentRadioGroup = questions[currentQuestion].querySelector('input[type="radio"]:checked');
        
        if (!currentRadioGroup) {
            // Alert user to select an option before proceeding
            alert('Please select an option before proceeding.');
            return;
        }
        
        // Hide current question
        questions[currentQuestion].classList.add('hidden');
        
        // Show next question
        currentQuestion++;
        questions[currentQuestion].classList.remove('hidden');
        questions[currentQuestion].classList.add('animate-fade-in');
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Update progress bar
        updateProgressBar();
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', () => {
        // Hide current question
        questions[currentQuestion].classList.add('hidden');
        
        // Show previous question
        currentQuestion--;
        questions[currentQuestion].classList.remove('hidden');
        questions[currentQuestion].classList.add('animate-fade-in');
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Update progress bar
        updateProgressBar();
    });
    
    // Submit test functionality
    submitTestBtn.addEventListener('click', () => {
        // Check if the last question has a selected option
        const lastRadioGroup = questions[currentQuestion].querySelector('input[type="radio"]:checked');
        
        if (!lastRadioGroup) {
            // Alert user to select an option before proceeding
            alert('Please select an option before proceeding.');
            return;
        }
        
        // Hide questions
        testQuestions.classList.add('hidden');
        
        // Show results
        testResults.classList.remove('hidden');
        testResults.classList.add('animate-fade-in');
        
        // Calculate and display results
        calculateResults();
    });
    
    // Retake test functionality
    retakeTestBtn.addEventListener('click', () => {
        // Reset test
        testResults.classList.add('hidden');
        testIntro.classList.remove('hidden');
        
        // Reset selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Reset to first question
        questions.forEach(question => {
            question.classList.add('hidden');
        });
        
        currentQuestion = 0;
        questions[currentQuestion].classList.remove('hidden');
        
        // Reset navigation buttons
        updateNavigationButtons();
    });
    
    // Update navigation buttons based on current question
    function updateNavigationButtons() {
        // Show/hide previous button
        if (currentQuestion === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
        
        // Show/hide next and submit buttons
        if (currentQuestion === questions.length - 1) {
            nextBtn.classList.add('hidden');
            submitTestBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitTestBtn.classList.add('hidden');
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
        testProgress.style.width = `${progressPercentage}%`;
        currentStepEl.textContent = currentQuestion + 1;
    }
    
    // Calculate and display results
    function calculateResults() {
        // Get user selections
        const q1Answer = document.querySelector('input[name="q1"]:checked').value;
        const q2Answer = document.querySelector('input[name="q2"]:checked').value;
        const q3Answer = document.querySelector('input[name="q3"]:checked').value;
        
        let resultText = '';
        let riskLevel = 'low';
        let recommendations = [];
        
        // Analyze OTP sharing (Question 1)
        if (q1Answer === 'yes') {
            resultText += '<h4 class="text-error">High Risk: Possible UPI/Banking Fraud</h4>';
            resultText += '<p>You shared your OTP, which is a critical security breach.</p>';
            recommendations.push('Call your bank immediately to report potential unauthorized transactions');
            recommendations.push('Change your passwords on all financial accounts');
            riskLevel = 'high';
        } else if (q1Answer === 'maybe') {
            resultText += '<h4 class="text-warning">Medium Risk: Potential Security Breach</h4>';
            resultText += '<p>You may have unintentionally shared sensitive information.</p>';
            recommendations.push('Monitor your bank accounts for any unauthorized activity');
            recommendations.push('Never share OTPs, even if the caller claims to be from your bank');
            riskLevel = 'medium';
        }
        
        // Analyze suspicious calls (Question 2)
        if (q2Answer === 'yes') {
            resultText += '<h4 class="text-error">High Risk: Possible Impersonation Scam</h4>';
            resultText += '<p>Answering suspicious video calls can lead to impersonation scams or digital arrests.</p>';
            recommendations.push('Do not engage with unknown callers claiming to be officials');
            recommendations.push('Report the incident to the local cyber cell or call 1930');
            riskLevel = riskLevel === 'low' ? 'medium' : 'high';
        } else if (q2Answer === 'received') {
            resultText += '<h4 class="text-warning">Medium Risk: Targeted by Scammers</h4>';
            resultText += '<p>You were targeted but avoided engagement. Stay vigilant.</p>';
            recommendations.push('Block the number and avoid answering calls from unknown numbers');
            riskLevel = riskLevel === 'low' ? 'low' : riskLevel;
        }
        
        // Analyze investment schemes (Question 3)
        if (q3Answer === 'yes') {
            resultText += '<h4 class="text-error">High Risk: Possible Investment Fraud</h4>';
            resultText += '<p>You may have fallen victim to a social media investment scam.</p>';
            recommendations.push('Stop any further investments immediately');
            recommendations.push('Document all communications and transactions');
            recommendations.push('File a complaint on the National Cyber Crime Portal');
            riskLevel = 'high';
        } else if (q3Answer === 'considering') {
            resultText += '<h4 class="text-warning">Medium Risk: Potential Investment Fraud Target</h4>';
            resultText += '<p>You are being targeted by potentially fraudulent investment schemes.</p>';
            recommendations.push('Verify the scheme with SEBI before investing');
            recommendations.push('Research the company thoroughly and check for regulatory registrations');
            riskLevel = riskLevel === 'low' ? 'medium' : riskLevel;
        }
        
        // If no risks identified
        if (q1Answer === 'no' && q2Answer === 'no' && q3Answer === 'no') {
            resultText += '<h4 class="text-success">Low Risk: Good Security Practices</h4>';
            resultText += '<p>You have demonstrated good security awareness.</p>';
            recommendations.push('Continue to maintain strong security practices');
            recommendations.push('Stay updated on the latest cybersecurity threats');
        }
        
        // Add recommendations
        if (recommendations.length > 0) {
            resultText += '<h4>Recommendations:</h4>';
            resultText += '<ul>';
            recommendations.forEach(recommendation => {
                resultText += `<li>${recommendation}</li>`;
            });
            resultText += '</ul>';
        }
        
        // Add general advice
        resultText += '<h4>Need More Help?</h4>';
        resultText += '<p>Connect with an expert through our help section or call the National Cybercrime Helpline at 1930.</p>';
        
        // Add risk level badge
        let badgeClass = '';
        if (riskLevel === 'high') {
            badgeClass = 'badge badge-error';
        } else if (riskLevel === 'medium') {
            badgeClass = 'badge badge-warning';
        } else {
            badgeClass = 'badge badge-success';
        }
        
        resultText = `<div class="${badgeClass}">${riskLevel.toUpperCase()} RISK</div>` + resultText;
        
        // Display results
        resultContent.innerHTML = resultText;
    }
}