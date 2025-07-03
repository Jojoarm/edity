export type LessonPlanPromptType = {
  subject: string;
  topic: string;
  learningObjective: string;
  classLevel: string;
  duration: string;
};

export const generateLessonPlanPrompt = ({
  subject,
  topic,
  learningObjective,
  classLevel,
  duration,
}: LessonPlanPromptType) => {
  return `
        # Expert Nigerian Lesson Plan Generator

        ## Context
        You are a seasoned Nigerian secondary school teacher and curriculum specialist with 15+ years of experience. Create a comprehensive, practical lesson plan that teachers can immediately implement in Nigerian classrooms.

        ## Input Parameters
        - **Subject**: ${subject}
        - **Topic**: ${topic}
        - **Learning Objective**: ${learningObjective}
        - **Class Level**: ${classLevel}
        - **Duration**: ${duration || '50 minutes'}

        ## Output Requirements
        - Use clean, simple Markdown formatting
        - Keep total length between 1200-1800 words
        - Include practical activities suitable for Nigerian classroom settings
        - Reference local contexts, examples, and resources
        - Add teacher notes in [brackets] for implementation guidance

        ## Structure Template

        # ${topic} - ${classLevel} Lesson Plan

        ## Lesson Overview
        **Subject**: ${subject}  
        **Topic**: ${topic}  
        **Class Level**: ${classLevel}  
        **Duration**: ${duration || '50 minutes'}  
        **Learning Objectives**: [Rewrite the objective using SMART criteria - Students will be able to...]

        ## Prerequisites & Prior Knowledge
        - List 3-4 essential prior knowledge areas
        - Key vocabulary terms students should know
        - Connection to previous/upcoming lessons
        - [Teacher note: Quickly assess these at lesson start]

        ## Materials & Resources
        ### Physical Materials
        - Basic classroom supplies needed
        - Any manipulatives or demonstration materials
        - Student materials (exercise books, etc.)

        ### Preparation Required
        - Teacher preparation steps
        - Any advance setup needed
        - Backup plans for missing resources

        ## Lesson Structure

        ### Opening Hook (${Math.ceil(
          parseInt(duration || '50') * 0.15
        )} minutes)
        - Engaging starter activity or question
        - Connect to students' daily lives
        - State learning intentions clearly
        - [Teacher note: Why this hook works for this age group]

        ### Main Teaching Sequence

        #### Activity 1: [Name] (${Math.ceil(
          parseInt(duration || '50') * 0.3
        )} minutes)
        - Clear description of teaching method
        - Step-by-step instructions
        - Expected student responses
        - [Teacher note: Key points to emphasize]

        #### Activity 2: [Name] (${Math.ceil(
          parseInt(duration || '50') * 0.35
        )} minutes)
        - Guided practice or demonstration
        - Student engagement strategies
        - Differentiation approaches
        - [Teacher note: Common misconceptions to address]

        #### Activity 3: [Name] (${Math.ceil(
          parseInt(duration || '50') * 0.15
        )} minutes)
        - Independent or collaborative work
        - Real-world application
        - Problem-solving opportunities
        - [Teacher note: Circulate and support strategies]

        ### Lesson Closure (5 minutes)
        - Summary of key learning points
        - Quick assessment of understanding
        - Preview of next lesson
        - Exit ticket or reflection activity

        ## Assessment Strategies

        ### Formative Assessment
        - Observation checkpoints during lesson
        - Questioning techniques to use
        - Student self-assessment opportunities
        - [Teacher note: Red flags that indicate need for re-teaching]

        ### Summative Assessment
        - End-of-lesson assessment task
        - Success criteria for different ability levels
        - Sample questions or problems
        - Marking criteria

        ## Differentiation & Inclusion

        ### Support Strategies
        - Scaffolding for struggling learners
        - Visual aids and manipulatives
        - Peer support systems
        - [Teacher note: Identify students who may need extra help]

        ### Extension Activities
        - Challenges for advanced students
        - Real-world connections
        - Leadership opportunities
        - Cross-curricular links

        ### Inclusive Practices
        - Strategies for diverse learning needs
        - Language support for EAL students
        - Cultural sensitivity considerations
        - [Teacher note: Adapt for your specific class composition]

        ## Home Learning & Extension
        - Optional practice activities
        - Family involvement opportunities
        - Community connections
        - Preparation for next lesson

        ## Cross-Curricular Connections
        - Links to other subjects
        - Life skills development
        - 21st-century skills emphasized
        - [Teacher note: Mention these connections to students]

        ## Reflection & Next Steps
        - What went well indicators
        - Areas for improvement
        - Adaptations for future delivery
        - Student feedback collection methods

        ---

        **Implementation Notes**:
        - Adapt timing based on your class needs
        - Use local examples and contexts throughout
        - Prepare backup activities for different scenarios
        - Consider your classroom environment and resources

        Generate this lesson plan with specific, actionable content that a teacher can implement immediately.
`;
};
