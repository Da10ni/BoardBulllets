import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Header from '../Header/Header';
import BottomNavigation from '../ui/BottomNavigation';
import { styles } from './QuizFlow.styles';

const { width } = Dimensions.get('window');

// Sample quiz data
const QUIZ_DATA = [
  {
    id: 1,
    question: "NERVE INJURED WITH A MEDIAL EPICONDYLE FRACTURE?",
    options: [
      "MEDIAN NERVE",
      "RADIAL NERVE",
      "ULNAR NERVE"
    ],
    correctAnswer: 2 // index of correct answer
  },
  {
    id: 2,
    question: "WHICH BONE IS THE LONGEST IN THE HUMAN BODY?",
    options: [
      "TIBIA",
      "FEMUR", 
      "HUMERUS",
      "RADIUS"
    ],
    correctAnswer: 1
  },
  // Add more questions as needed
];

export default function QuizFlow() {
  const [currentScreen, setCurrentScreen] = useState('timer'); // timer, question, summary, results, home
  const [selectedTime, setSelectedTime] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const timeOptions = [5, 10, 20];
  const currentQuestion = QUIZ_DATA[currentQuestionIndex];
  const totalQuestions = QUIZ_DATA.length;

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (quizStarted && timeRemaining > 0 && currentScreen === 'question') {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeRemaining, currentScreen]);

  const handleNavPress = (id) => {
    console.log(`Navigating to: ${id}`);
  };

  const handleStartQuiz = () => {
    setTimeRemaining(selectedTime * 60); // Convert minutes to seconds
    setQuizStarted(true);
    setCurrentScreen('question');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Save the answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    setSelectedAnswer(null);
    setShowCorrectAnswer(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      setCurrentScreen('summary');
    }
  };

  const handleTimeUp = () => {
    setCurrentScreen('summary');
    setQuizStarted(false);
  };

  const handleReviewQuiz = () => {
    setCurrentScreen('results');
    setCurrentQuestionIndex(0);
    setShowCorrectAnswer(true);
  };

  const handleBackToHome = () => {
    setCurrentScreen('timer');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setQuizStarted(false);
    setShowCorrectAnswer(false);
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_DATA.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: totalQuestions, percentage: Math.round((correct / totalQuestions) * 100) };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

 const renderTimerScreen = () => (
  <View style={{ flex: 1 }}>
    <View style={[
      styles.timerSection,
      {
        position: 'absolute',
        bottom: 80,
        width: '90%',
        alignSelf: 'center',
       // zIndex: 999, // ensures it's above other content
      }
    ]}>
      <View style={styles.iconsRow}>
        <View style={styles.iconContainer}>
          <Feather name="shuffle" size={24} color="#ADB5BD" />
        </View>
        <View style={[styles.iconContainer, styles.activeIconContainer]}>
          <Ionicons name="timer-outline" size={24} color="#3257a8" />
        </View>
        <View style={styles.iconContainer}>
          <Feather name="file-text" size={24} color="#ADB5BD" />
        </View>
      </View>

      <Text style={styles.timedLabel}>TIMED</Text>

      <View style={styles.timeOptionsContainer}>
        {timeOptions.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeOption,
              selectedTime === time && styles.selectedTimeOption,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
        <Text style={styles.startQuizButtonText}>START QUIZ</Text>
      </TouchableOpacity>
    </View>
  </View>
);


   const renderQuestionScreen = () => (
    <View style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <View style={styles.timerDisplay}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
        <Text style={styles.questionCounter}>
          QUESTION {currentQuestionIndex + 1}
        </Text>
        <TouchableOpacity onPress={() => setCurrentScreen('timer')}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressDots}>
        {QUIZ_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index < currentQuestionIndex && styles.completedDot,
              index === currentQuestionIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              showCorrectAnswer && index === currentQuestion.correctAnswer && styles.correctOption,
              showCorrectAnswer && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer && styles.incorrectOption,
            ]}
            onPress={() => !showCorrectAnswer && handleAnswerSelect(index)}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === index && styles.selectedOptionText,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ position: 'absolute', top: 20, left: 20, right: 20 }}>
        <TouchableOpacity
          style={[styles.nextButton, selectedAnswer === null && styles.disabledButton]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === totalQuestions - 1 ? 'FINISH QUIZ' : 'NEXT QUESTION'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummaryScreen = () => {
    const score = calculateScore();
    
    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>QUIZ SUMMARY</Text>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{score.percentage}%</Text>
            <Text style={styles.scoreLabel}>SCORE</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{score.correct}</Text>
            <Text style={styles.statLabel}>CORRECT</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{score.total - score.correct}</Text>
            <Text style={styles.statLabel}>INCORRECT</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{score.total}</Text>
            <Text style={styles.statLabel}>TOTAL</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.reviewButton} onPress={handleReviewQuiz}>
          <Text style={styles.reviewButtonText}>REVIEW QUIZ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderResultsScreen = () => {
    const currentAnswer = userAnswers[currentQuestion.id];
    const isCorrect = currentAnswer === currentQuestion.correctAnswer;
    
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultHeader}>
          <Text style={styles.questionCounter}>QUESTION {currentQuestionIndex + 1}</Text>
          <Text style={[styles.resultStatus, isCorrect ? styles.correct : styles.incorrect]}>
            {isCorrect ? 'CORRECT' : 'INCORRECT'}
          </Text>
        </View>

        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <View
              key={index}
              style={[
                styles.resultOption,
                index === currentQuestion.correctAnswer && styles.correctResultOption,
                currentAnswer === index && currentAnswer !== currentQuestion.correctAnswer && styles.incorrectResultOption,
              ]}
            >
              <Text style={[
                styles.resultOptionText,
                index === currentQuestion.correctAnswer && styles.correctResultText,
              ]}>
                {option}
              </Text>
              {index === currentQuestion.correctAnswer && (
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              )}
              {currentAnswer === index && currentAnswer !== currentQuestion.correctAnswer && (
                <Ionicons name="close-circle" size={20} color="#F44336" />
              )}
            </View>
          ))}
        </View>

        <View style={styles.navigationButtons}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              <Ionicons name="chevron-back" size={20} color="#3257a8" />
              <Text style={styles.navButtonText}>PREVIOUS</Text>
            </TouchableOpacity>
          )}
          
          {currentQuestionIndex < totalQuestions - 1 ? (
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => setCurrentQuestionIndex(prev => prev + 1)}
            >
              <Text style={styles.navButtonText}>NEXT</Text>
              <Ionicons name="chevron-forward" size={20} color="#3257a8" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.finishButton} onPress={handleBackToHome}>
              <Text style={styles.finishButtonText}>FINISH REVIEW</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header />
        
        <View style={styles.homeSection}>
          <Text style={styles.homeLabel}>
            {currentScreen === 'timer' && 'QUIZ ME'}
            {currentScreen === 'question' && 'QUIZ IN PROGRESS'}
            {currentScreen === 'summary' && 'QUIZ COMPLETE'}
            {currentScreen === 'results' && 'QUIZ REVIEW'}
          </Text>
        </View>

        {currentScreen === 'timer' && renderTimerScreen()}
        {currentScreen === 'question' && renderQuestionScreen()}
        {currentScreen === 'summary' && renderSummaryScreen()}
        {currentScreen === 'results' && renderResultsScreen()}

        <View style={styles.spacer} />
      </ScrollView>

      <BottomNavigation onNavPress={handleNavPress} />
    </SafeAreaView>
  );
}