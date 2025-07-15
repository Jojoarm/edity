export interface LessonPlanPromptType {
  subject: string;
  topic: string;
  learningObjective: string;
  classLevel: string;
  duration: string;
}

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
        - **Duration**: ${duration || 50} minutes

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

//curriculum map
export interface CurriculumMapPromptType {
  term: string;
  subject: string;
  topicCount: number;
  classLevel: string;
}

export const generateCurriculumMapPrompt = ({
  term,
  subject,
  topicCount,
  classLevel,
}: CurriculumMapPromptType) => {
  const weeksInTerm = term.toLowerCase().includes('first')
    ? 13
    : term.toLowerCase().includes('second')
    ? 13
    : 12;

  return `
        # Expert Nigerian Curriculum Mapping Generator

        ## Context
        You are a seasoned Nigerian curriculum specialist and educational consultant with 20+ years of experience in designing coherent, progressive learning pathways. Create a comprehensive term-by-term curriculum map that provides clear scope, sequence, and alignment for Nigerian schools.

        ## Input Parameters
        - **Term**: ${term}
        - **Subject**: ${subject}
        - **Topic Count**: ${topicCount} topics
        - **Class Level**: ${classLevel}
        - **Estimated Duration**: ${weeksInTerm} weeks

        ## Output Requirements
        - Use clean, structured Markdown formatting
        - Keep total length between 2000-3000 words
        - Ensure logical progression and skill building
        - Reference Nigerian curriculum standards and contexts
        - Include practical implementation guidance
        - Add curriculum designer notes in [brackets] for strategic insights

        ## Structure Template

        # ${subject} Curriculum Map - ${classLevel} (${term})

        ## Curriculum Overview
        **Subject**: ${subject}  
        **Class Level**: ${classLevel}  
        **Term**: ${term}  
        **Duration**: ${weeksInTerm} weeks  
        **Topic Count**: ${topicCount} topics  
        **Framework**: Nigerian Educational Research and Development Council (NERDC) Standards

        ## Term Learning Goals
        ### Primary Objectives
        - [3-4 overarching learning goals for the term]
        - [Skills students will develop]
        - [Knowledge areas to be mastered]
        - [Attitudes and values to be fostered]

        ### Skills Progression Map
        **Foundation Skills** (Weeks 1-${Math.ceil(weeksInTerm / 3)})
        - Core concepts and vocabulary
        - Basic procedural knowledge
        - Fundamental thinking skills

        **Development Skills** (Weeks ${
          Math.ceil(weeksInTerm / 3) + 1
        }-${Math.ceil((weeksInTerm * 2) / 3)})
        - Application of concepts
        - Problem-solving strategies
        - Critical thinking development

        **Mastery Skills** (Weeks ${
          Math.ceil((weeksInTerm * 2) / 3) + 1
        }-${weeksInTerm})
        - Synthesis and evaluation
        - Creative application
        - Independent learning

        ## Weekly Curriculum Breakdown

        ${Array.from({ length: Math.ceil(topicCount) }, (_, i) => {
          const weekStart = Math.floor((i * weeksInTerm) / topicCount) + 1;
          const weekEnd = Math.floor(((i + 1) * weeksInTerm) / topicCount);
          const weekRange =
            weekStart === weekEnd
              ? `Week ${weekStart}`
              : `Weeks ${weekStart}-${weekEnd}`;

          return `### Topic ${i + 1}: [Topic Name] (${weekRange})

        **Learning Objectives**
        - Students will be able to [specific, measurable objective]
        - Students will demonstrate [skill/knowledge area]
        - Students will analyze/evaluate/create [higher-order thinking]

        **Core Content Areas**
        - [Key concept 1] - fundamental understanding
        - [Key concept 2] - practical application
        - [Key concept 3] - real-world connections
        - [Vocabulary terms]: [List 5-8 essential terms]

        **Teaching Strategies**
        - **Direct Instruction**: [Concept introduction methods]
        - **Guided Practice**: [Scaffolded learning activities]
        - **Independent Application**: [Student-centered tasks]
        - **Collaborative Learning**: [Group work opportunities]

        **Assessment Integration**
        - **Formative**: [Ongoing assessment strategies]
        - **Summative**: [End-of-topic evaluation methods]
        - **Diagnostic**: [Pre-assessment tools]
        - **Performance Indicators**: [Success criteria]

        **Resources & Materials**
        - Textbook sections: [Specific chapters/pages]
        - Supplementary materials: [Additional resources]
        - Technology integration: [Digital tools/platforms]
        - Local context materials: [Nigerian examples/case studies]

        **Cross-Curricular Connections**
        - [Subject 1]: [Specific connection and benefit]
        - [Subject 2]: [Integration opportunity]
        - Life skills: [Real-world application]
        - 21st-century skills: [Critical thinking, communication, etc.]

        **Differentiation Strategies**
        - **Support**: [Scaffolding for struggling learners]
        - **Extension**: [Challenges for advanced students]
        - **Multiple Intelligences**: [Varied learning approaches]
        - **Cultural Responsiveness**: [Local context integration]

        **[Curriculum Designer Note: Key implementation considerations for this topic]**

        ---`;
        }).join('\n\n        ')}

        ## Assessment Calendar

        ### Formative Assessment Schedule
        | Week | Assessment Type | Purpose | Duration |
        |------|----------------|---------|----------|
        ${Array.from({ length: Math.ceil(weeksInTerm / 2) }, (_, i) => {
          const week = (i + 1) * 2;
          return `| ${week} | Quick Check Quiz | Monitor understanding | 10 minutes |`;
        }).join('\n        ')}

        ### Summative Assessment Plan
        **Mid-Term Assessment** (Week ${Math.ceil(weeksInTerm / 2)})
        - Format: [Test type - written, practical, project]
        - Topics covered: [Topics 1-${Math.ceil(topicCount / 2)}]
        - Weightage: [Percentage of term grade]
        - Duration: [Time allocation]

        **End-of-Term Assessment** (Week ${weeksInTerm})
        - Format: [Comprehensive evaluation method]
        - Topics covered: [All ${topicCount} topics]
        - Weightage: [Percentage of term grade]
        - Duration: [Time allocation]

        **Continuous Assessment Integration**
        - Class participation: [Evaluation criteria]
        - Homework completion: [Quality indicators]
        - Project work: [Rubric standards]
        - [Curriculum Designer Note: Balance between different assessment types]

        ## Skill Development Progression

        ### Cognitive Skills Ladder
        **Remembering & Understanding** (Weeks 1-${Math.ceil(weeksInTerm / 4)})
        - Recall of facts and concepts
        - Basic comprehension skills
        - Vocabulary development

        **Applying & Analyzing** (Weeks ${
          Math.ceil(weeksInTerm / 4) + 1
        }-${Math.ceil((weeksInTerm * 3) / 4)})
        - Practical application of knowledge
        - Problem-solving strategies
        - Critical thinking development

        **Evaluating & Creating** (Weeks ${
          Math.ceil((weeksInTerm * 3) / 4) + 1
        }-${weeksInTerm})
        - Synthesis of learning
        - Creative expression
        - Independent judgment

        ### 21st Century Skills Integration
        **Communication Skills**
        - Written communication through [specific activities]
        - Oral presentation via [structured opportunities]
        - Digital communication using [technology tools]

        **Collaboration Skills**
        - Group project work in [specific contexts]
        - Peer learning activities
        - Community engagement projects

        **Critical Thinking Skills**
        - Problem-solving scenarios
        - Analysis and evaluation tasks
        - Decision-making opportunities

        **Creativity & Innovation**
        - Open-ended project work
        - Alternative solution generation
        - Artistic and creative expression

        ## Resource Management Plan

        ### Essential Resources
        **Textbooks & References**
        - Primary textbook: [Specific title and chapters]
        - Supplementary readings: [Additional materials]
        - Reference materials: [Dictionaries, atlases, etc.]

        **Technology Integration**
        - Digital platforms: [Specific tools and applications]
        - Online resources: [Websites, databases, simulations]
        - Multimedia content: [Videos, animations, presentations]

        **Physical Materials**
        - Laboratory equipment: [If applicable]
        - Manipulatives and models: [Hands-on materials]
        - Display materials: [Charts, posters, specimens]

        **Community Resources**
        - Local expertise: [Guest speakers, field trips]
        - Cultural materials: [Local examples and case studies]
        - Real-world connections: [Industry partnerships]

        ### Resource Allocation Timeline
        | Week Range | Primary Resources | Preparation Required |
        |------------|------------------|---------------------|
        ${Array.from({ length: Math.ceil(topicCount / 2) }, (_, i) => {
          const startWeek = i * 2 + 1;
          const endWeek = Math.min((i + 1) * 2, weeksInTerm);
          return `| ${startWeek}-${endWeek} | [Specific materials needed] | [Advance preparation steps] |`;
        }).join('\n        ')}

        ## Alignment & Standards Mapping

        ### Nigerian Curriculum Standards Alignment
        **Core Competencies Addressed**
        - [Standard 1]: [Specific alignment description]
        - [Standard 2]: [How curriculum meets this standard]
        - [Standard 3]: [Evidence of standard achievement]

        **Learning Objectives Hierarchy**
        - **Term Objectives**: [Broad, overarching goals]
        - **Topic Objectives**: [Specific, measurable outcomes]
        - **Lesson Objectives**: [Daily learning targets]

        ### Vertical Alignment
        **Previous Term Connections**
        - Prior knowledge requirements
        - Skill prerequisites
        - Conceptual foundations

        **Next Term Preparation**
        - Foundation building for future learning
        - Skill development trajectory
        - Concept progression pathway

        ### Horizontal Alignment
        **Cross-Subject Integration**
        - [Subject 1]: [Specific connection points]
        - [Subject 2]: [Shared learning objectives]
        - [Subject 3]: [Complementary skill development]

        ## Implementation Guidelines

        ### Pacing Considerations
        **Flexible Timing**
        - Core content: [Non-negotiable time allocation]
        - Extension activities: [Adjustable based on class needs]
        - Review sessions: [Built-in consolidation time]

        **Differentiation Strategies**
        - **Accelerated Learners**: [Advanced pathway options]
        - **Struggling Learners**: [Additional support mechanisms]
        - **Diverse Learning Needs**: [Multiple pathway approaches]

        ### Professional Development Needs
        **Teacher Preparation**
        - Subject matter expertise requirements
        - Pedagogical skill development
        - Assessment literacy needs

        **Ongoing Support**
        - Collaborative planning opportunities
        - Mentoring and coaching support
        - Resource sharing mechanisms

        ## Quality Assurance & Review

        ### Curriculum Monitoring
        **Weekly Check-ins**
        - Pacing progress review
        - Student understanding assessment
        - Resource adequacy evaluation

        **Monthly Reviews**
        - Objective achievement analysis
        - Assessment data interpretation
        - Curriculum adjustment needs

        ### Continuous Improvement
        **Data Collection Points**
        - Student performance metrics
        - Teacher feedback sessions
        - Parent/community input

        **Revision Cycles**
        - Term-end curriculum evaluation
        - Annual curriculum review
        - Stakeholder feedback integration

        ## Success Indicators

        ### Student Achievement Metrics
        **Quantitative Measures**
        - Assessment score improvements
        - Skill demonstration rates
        - Learning objective mastery percentages

        **Qualitative Indicators**
        - Student engagement levels
        - Critical thinking development
        - Creative expression growth

        ### Implementation Success Factors
        **Teacher Effectiveness**
        - Curriculum adherence rates
        - Pedagogical innovation
        - Student relationship quality

        **System Support**
        - Resource availability
        - Administrative backing
        - Community engagement

        ---

        **Implementation Notes**:
        - Adapt pacing based on class dynamics and local context
        - Maintain flexibility while ensuring core objective achievement
        - Use local examples and case studies throughout
        - Build in regular review and adjustment cycles
        - Ensure alignment with school-wide educational goals

        **[Curriculum Designer Note: This map provides a comprehensive framework while maintaining the flexibility needed for responsive teaching. Regular monitoring and adjustment ensure optimal learning outcomes for all students.]**

        Generate this curriculum map with specific, actionable content that curriculum designers and teachers can implement immediately for effective term-by-term planning.
`;
};

// Resources Recommendation
export interface ResourceRecommendationPromptType {
  term: string;
  subject: string;
  topic: string;
  learningObjective: string;
  classLevel: string;
}

export const generateResourceRecommendationPrompt = ({
  term,
  subject,
  topic,
  learningObjective,
  classLevel,
}: ResourceRecommendationPromptType) => {
  return `
        # Expert Nigerian Educational Resource Recommendation Engine

        ## Context
        You are a seasoned Nigerian educational technology specialist and curriculum resource expert with 15+ years of experience in selecting and curating high-quality learning materials. Generate a comprehensive list of educational resources that Nigerian teachers can immediately use to enhance their lessons and support student learning.

        ## Input Parameters
        - **Term**: ${term}
        - **Subject**: ${subject}
        - **Topic**: ${topic}
        - **Learning Objective**: ${learningObjective}
        - **Class Level**: ${classLevel}

        ## Output Requirements
        - Use clean, simple Markdown formatting
        - Keep total length between 1000-1500 words
        - Focus on accessible, practical resources suitable for Nigerian classrooms
        - Include both digital and physical resource options
        - Provide implementation guidance for each resource type
        - Consider varying levels of technology access

        ## Structure Template

        # Resource Recommendations: ${topic} - ${classLevel}

        ## Resource Overview
        **Term**: ${term}  
        **Subject**: ${subject}  
        **Topic**: ${topic}  
        **Class Level**: ${classLevel}  
        **Learning Objective**: ${learningObjective}  
        **Resource Categories**: 6 main types with multiple options per category

        ## 🔗 YouTube Videos & Online Content

        ### Primary Video Resources
        1. **[Video Title/Channel Recommendation]**
           - Duration: [X minutes]
           - Key concepts covered: [List 3-4 main points]
           - Why it's effective: [Pedagogical rationale]
           - Suggested use: [Before/during/after lesson]
           - [Teacher note: Prepare discussion questions about...]

        2. **[Video Title/Channel Recommendation]**
           - Duration: [X minutes]
           - Key concepts covered: [List 3-4 main points]
           - Why it's effective: [Pedagogical rationale]
           - Suggested use: [Before/during/after lesson]
           - [Teacher note: Pause at key moments to...]

        3. **[Video Title/Channel Recommendation]**
           - Duration: [X minutes]
           - Key concepts covered: [List 3-4 main points]
           - Why it's effective: [Pedagogical rationale]
           - Suggested use: [Before/during/after lesson]
           - [Teacher note: Use for visual learners who...]

        ### Alternative Channels/Playlists
        - Additional recommended YouTube channels
        - Playlist suggestions for extended learning
        - Local Nigerian educational content creators
        - [Teacher note: Preview content before showing to class]

        ## 📘 Textbook Chapters & Reference Materials

        ### Recommended Textbooks
        1. **[Textbook Title] by [Author]**
           - Specific chapters: [Chapter X, Y, Z]
           - Page references: [Pages XX-XX]
           - Key sections to focus on: [List specific topics]
           - Reading level: [Appropriate for class level]
           - [Teacher note: Assign as pre-reading or reference]

        2. **[Alternative Textbook]**
           - Specific chapters: [Chapter X, Y, Z]
           - Page references: [Pages XX-XX]
           - Comparative approach: [How it differs from main text]
           - Supplementary value: [What additional insights it provides]
           - [Teacher note: Use for different learning styles]

        ### Reference Materials
        - Encyclopedias and reference books
        - Academic journals (simplified excerpts)
        - Government publications and reports
        - [Teacher note: Help students evaluate source credibility]

        ## 📄 PDF Worksheets & Printable Resources

        ### Structured Worksheets
        1. **[Worksheet Type]: [Specific Focus]**
           - Activity description: [What students will do]
           - Skills developed: [List 3-4 skills]
           - Time requirement: [X minutes]
           - Difficulty level: [Beginner/Intermediate/Advanced]
           - [Teacher note: Provide answer key and common mistakes]

        2. **[Worksheet Type]: [Specific Focus]**
           - Activity description: [What students will do]
           - Skills developed: [List 3-4 skills]
           - Time requirement: [X minutes]
           - Differentiation options: [How to adapt for different levels]
           - [Teacher note: Consider pair/group work options]

        3. **[Assessment Worksheet]: [Topic Review]**
           - Question types: [Multiple choice, short answer, problem-solving]
           - Assessment focus: [What learning objectives it measures]
           - Marking criteria: [How to evaluate responses]
           - Follow-up activities: [For struggling students]
           - [Teacher note: Use for formative assessment]

        ### Printable Resources
        - Graphic organizers and templates
        - Fact sheets and summary cards
        - Student reflection journals
        - [Teacher note: Laminate for repeated use]

        ## 🖼️ Infographics & Visual Aids

        ### Subject-Specific Infographics
        1. **[Infographic Title/Topic]**
           - Visual elements: [Charts, diagrams, illustrations]
           - Key information presented: [Main concepts visualized]
           - Cognitive load: [Appropriate complexity for age group]
           - Display options: [Poster, handout, digital presentation]
           - [Teacher note: Use for visual learners and wall displays]

        2. **[Infographic Title/Topic]**
           - Visual elements: [Charts, diagrams, illustrations]
           - Key information presented: [Main concepts visualized]
           - Interactive potential: [How students can engage with it]
           - Cross-curricular connections: [Links to other subjects]
           - [Teacher note: Have students create their own versions]

        ### Visual Learning Tools
        - Mind maps and concept maps
        - Timeline infographics
        - Process diagrams and flowcharts
        - Comparison charts and tables
        - [Teacher note: Teach students to create these tools]

        ## 🎮 Educational Games & Simulations

        ### Digital Games/Simulations
        1. **[Game/Simulation Name]**
           - Platform: [Web-based, mobile app, desktop]
           - Game mechanics: [How students interact]
           - Learning outcomes: [Skills and knowledge gained]
           - Time commitment: [Session length]
           - Technical requirements: [Internet, devices needed]
           - [Teacher note: Monitor progress and facilitate reflection]

        2. **[Game/Simulation Name]**
           - Platform: [Web-based, mobile app, desktop]
           - Game mechanics: [How students interact]
           - Assessment integration: [How to track learning]
           - Collaborative features: [Group play options]
           - Technical requirements: [Internet, devices needed]
           - [Teacher note: Set clear learning objectives before play]

        ### Offline Games & Activities
        - Card games and board games
        - Role-playing activities
        - Simulation exercises
        - Physical manipulation games
        - [Teacher note: Adapt for large class sizes]

        ## 📂 Open Educational Resources (OER)

        ### Digital Libraries & Repositories
        1. **[OER Platform Name]**
           - Content types available: [Videos, texts, activities]
           - Quality indicators: [Peer-reviewed, institutionally backed]
           - Accessibility features: [Offline options, mobile-friendly]
           - License information: [Usage rights and restrictions]
           - [Teacher note: Bookmark and organize favorites]

        2. **[OER Platform Name]**
           - Content types available: [Videos, texts, activities]
           - Nigerian relevance: [Local context and examples]
           - Curriculum alignment: [Standards and objectives met]
           - Update frequency: [How current the content is]
           - [Teacher note: Contribute your own resources]

        ### Specific OER Collections
        - Subject-specific repositories
        - Multimedia collections
        - Assessment banks
        - Professional development resources
        - [Teacher note: Verify content before using]

        ## Implementation Guidance

        ### Technology Considerations
        - **High-tech options**: For schools with reliable internet and devices
        - **Low-tech alternatives**: For schools with limited technology access
        - **Hybrid approaches**: Combining digital and physical resources
        - **Offline solutions**: Downloadable content for later use
        - [Teacher note: Have backup plans for technical issues]

        ### Resource Selection Criteria
        - Alignment with learning objectives
        - Age-appropriate content and complexity
        - Cultural relevance and sensitivity
        - Accessibility for diverse learners
        - Cost-effectiveness and sustainability
        - [Teacher note: Evaluate resources regularly for effectiveness]

        ### Professional Development
        - Training opportunities for new resources
        - Peer collaboration and sharing
        - Student feedback integration
        - Continuous improvement strategies
        - [Teacher note: Keep a resource effectiveness log]

        ## Customization & Adaptation

        ### Differentiation Strategies
        - Resources for different learning styles
        - Scaffolding for struggling students
        - Extension materials for advanced learners
        - Multilingual support options
        - [Teacher note: Know your students' individual needs]

        ### Local Context Integration
        - Nigerian examples and case studies
        - Cultural references and connections
        - Community resource partnerships
        - Real-world application opportunities
        - [Teacher note: Connect learning to students' lives]

        ---

        **Resource Implementation Notes**:
        - Start with 2-3 resources per category to avoid overwhelm
        - Test digital resources before classroom use
        - Create a resource library for easy access
        - Gather student feedback on resource effectiveness
        - Collaborate with colleagues to share successful resources
        - Consider data costs when recommending online resources

        Generate this resource recommendation list with specific, actionable suggestions that Nigerian educators can implement immediately, considering varying levels of technology access and infrastructure.
`;
};

//reporting tool
export interface StudentReportPromptType {
  studentName: string;
  subject: string;
  term: string;
  classLevel: string;
  strengths: string;
  improvementAreas: string;
  behaviorAndParticipation: string;
  academicPerformanceSummary: string;
  teacherNote?: string;
  educatorName: string;
  educatorContact: string;
  currentDate: string;
}

export const generateStudentReportPrompt = ({
  studentName,
  subject,
  term,
  classLevel,
  strengths,
  improvementAreas,
  behaviorAndParticipation,
  academicPerformanceSummary,
  teacherNote,
  educatorName,
  educatorContact,
  currentDate,
}: StudentReportPromptType) => {
  return `
        # Expert Nigerian Student Report Generator

        ## Context
        You are an experienced Nigerian secondary school teacher and educational assessment specialist with 15+ years of experience in student evaluation and report writing. Create a comprehensive, professional student performance report that provides clear insights into learning progress and actionable recommendations for continued growth.

        ## Input Parameters
        - **Student Name**: ${studentName}
        - **Subject**: ${subject}
        - **Term**: ${term}
        - **Class Level**: ${classLevel}
        - **Strengths**: ${strengths}
        - **Improvement Areas**: ${improvementAreas}
        - **Behavior & Participation**: ${behaviorAndParticipation}
        - **Academic Performance Summary**: ${academicPerformanceSummary}
        ${teacherNote ? `- **Teacher Note**: ${teacherNote}` : ''}

        ## Output Requirements
        - Use clean, professional formatting suitable for official school records
        - Keep total length between 800-1200 words
        - Write in clear, constructive language that students and parents can understand
        - Include specific examples and actionable recommendations
        - Maintain a balanced, encouraging tone while being honest about areas for growth
        - Reference Nigerian educational standards and contexts where relevant

        ## Structure Template

        # Student Performance Report

        ## Student Information
        **Student Name**: ${studentName}  
        **Subject**: ${subject}  
        **Class Level**: ${classLevel}  
        **Term**: ${term}  
        **Report Date**: ${currentDate}

        ## Executive Summary
        [2-3 sentences providing an overall assessment of the student's performance this term, highlighting key achievements and growth areas in a balanced manner]

        ## Academic Performance Analysis

        ### Subject-Specific Achievement
        - **Current Performance Level**: [Based on academic performance summary]
        - **Key Learning Milestones**: [Specific topics/skills mastered this term]
        - **Assessment Results**: [Performance on tests, assignments, projects]
        - **Curriculum Alignment**: [How student is progressing against ${classLevel} ${subject} curriculum expectations]

        ### Demonstrated Strengths
        [Elaborate on the provided strengths with specific examples and evidence]
        - **Core Competencies**: [List 3-4 key strengths with examples]
        - **Learning Style Preferences**: [How student learns best]
        - **Notable Achievements**: [Specific accomplishments this term]
        - **Transferable Skills**: [Skills that benefit other subjects/areas]

        ### Areas for Continued Development
        [Transform improvement areas into growth opportunities with specific strategies]
        - **Skill Gaps Identified**: [Specific areas needing attention]
        - **Learning Challenges**: [Obstacles to overcome]
        - **Conceptual Understanding**: [Topics requiring reinforcement]
        - **Study Skills Development**: [Organizational/learning strategies needed]

        ## Behavioral Assessment & Classroom Engagement

        ### Participation & Engagement
        [Elaborate on behavior and participation with specific observations]
        - **Classroom Contribution**: [Quality and frequency of participation]
        - **Collaboration Skills**: [Working with peers]
        - **Initiative & Leadership**: [Self-direction and helping others]
        - **Attendance & Punctuality**: [Impact on learning]

        ### Social & Emotional Development
        - **Peer Relationships**: [Interaction with classmates]
        - **Respect & Responsibility**: [Following classroom expectations]
        - **Resilience & Perseverance**: [Response to challenges]
        - **Communication Skills**: [Expression of ideas and questions]

        ## Learning Progress Tracking

        ### Term-over-Term Growth
        - **Improvement Trajectory**: [Progress since last assessment]
        - **Skill Development**: [New competencies acquired]
        - **Confidence Building**: [Areas of increased self-assurance]
        - **Challenge Response**: [How student handles difficult concepts]

        ### Comparative Analysis
        - **Class Performance Context**: [How student compares to class average]
        - **Age-Appropriate Expectations**: [Meeting developmental milestones]
        - **Individual Growth Measurement**: [Personal progress indicators]

        ## Recommendations & Next Steps

        ### For Student Success
        - **Immediate Focus Areas**: [2-3 priority areas for next term]
        - **Study Strategies**: [Specific methods to improve learning]
        - **Skill Building Activities**: [Targeted exercises or practices]
        - **Confidence Building**: [Ways to leverage strengths]

        ### For Parent/Guardian Support
        - **Home Learning Support**: [How families can assist]
        - **Resource Recommendations**: [Books, apps, activities]
        - **Communication Strategies**: [How to discuss progress with student]
        - **Monitoring Suggestions**: [What to watch for at home]

        ### For Teacher Collaboration
        - **Instructional Adjustments**: [Teaching strategies to emphasize]
        - **Assessment Modifications**: [Different ways to evaluate progress]
        - **Differentiation Needs**: [Specific accommodations or extensions]
        - **Professional Development**: [Skills teacher might develop to better support student]

        ## Goal Setting for Next Term

        ### Academic Objectives
        - **Learning Targets**: [Specific, measurable goals]
        - **Skill Development Priorities**: [Focus areas for improvement]
        - **Assessment Benchmarks**: [Success indicators]
        - **Timeline Expectations**: [Realistic progress milestones]

        ### Personal Development Goals
        - **Behavioral Targets**: [Areas for social-emotional growth]
        - **Participation Goals**: [Engagement expectations]
        - **Independence Building**: [Self-management skills]
        - **Leadership Opportunities**: [Ways to contribute to class community]

        ## Resources & Support Systems

        ### School-Based Support
        - **Additional Help Available**: [Tutoring, remediation, enrichment]
        - **Peer Learning Opportunities**: [Study groups, mentoring]
        - **Teacher Availability**: [Office hours, extra support times]
        - **School Resources**: [Library, technology, materials]

        ### Community & Family Engagement
        - **Extension Activities**: [Community connections to learning]
        - **Family Learning Projects**: [Home-school collaboration ideas]
        - **Extracurricular Connections**: [Clubs, activities that support learning]
        - **Local Resources**: [Community support for student interests]

        ## Professional Observations
        ${
          teacherNote
            ? `
        ### Teacher Insights
        [Expand on the provided teacher note with professional context and implications]
        `
            : ''
        }

        ### Future Potential
        [Professional assessment of student's trajectory and potential]
        - **Strengths to Build Upon**: [Natural talents and interests]
        - **Career Interest Connections**: [How current performance relates to future paths]
        - **Leadership Potential**: [Emerging leadership qualities]
        - **Innovation & Creativity**: [Unique thinking patterns or approaches]

        ## Conclusion & Commitment
        [Summarize key points and express commitment to student's continued success. Include invitation for parent/guardian communication and next steps for collaboration]

        ---

        **Report Prepared By**: ${educatorName}
        **Contact Information**: ${educatorContact}  

        **Note**: This report reflects observations and assessments from ${term}. For questions or concerns, please contact the school to schedule a consultation.

        Generate this student report with specific, evidence-based observations and actionable recommendations that support continued learning and development.
`;
};

//survey launch tool
export interface QuestionTypeConfig {
  type: 'multiple_choice' | 'short_text' | 'rating' | 'yes_no' | 'likert_scale';
  count: number; // Number of questions of this type to generate
  focus?: string; // Optional focus area for the questions
}

export interface SurveyLaunchPromptType {
  surveyTitle: string;
  targetAudience: string;
  purposeDescription: string;
  deliveryFormat?: string;
  questionTypes: QuestionTypeConfig[]; // Changed from surveyQuestions to questionTypes
  launchDate: string;
  deadline?: string;
  coordinatorName: string;
  coordinatorContact: string;
  currentDate: string;
}

export const generateSurveyLaunchPrompt = ({
  surveyTitle,
  targetAudience,
  purposeDescription,
  deliveryFormat,
  questionTypes,
  launchDate,
  deadline,
  coordinatorName,
  coordinatorContact,
  currentDate,
}: SurveyLaunchPromptType) => {
  const formatQuestionTypes = (types: QuestionTypeConfig[]) => {
    return types
      .map((config, index) => {
        let typeFormat = `${index + 1}. **${config.type.replace(
          '_',
          ' '
        )}** - ${config.count} question${config.count > 1 ? 's' : ''}`;

        if (config.focus) {
          typeFormat += `\n   Focus Area: ${config.focus}`;
        }

        return typeFormat;
      })
      .join('\n\n');
  };

  return `
        # Expert Nigerian School Survey Launch Coordinator & Question Generator

        ## Context
        You are an experienced Nigerian educational administrator and survey specialist with 10+ years of experience in educational research, data collection, and stakeholder engagement. Your task is to:
        1. **Generate relevant, effective survey questions** based on the specified question types and survey purpose
        2. **Create a comprehensive survey launch plan** that ensures maximum participation and actionable data collection

        ## Input Parameters
        - **Survey Title**: ${surveyTitle}
        - **Target Audience**: ${targetAudience}
        - **Purpose/Description**: ${purposeDescription}
        ${deliveryFormat ? `- **Delivery Format**: ${deliveryFormat}` : ''}
        - **Launch Date**: ${launchDate}
        ${deadline ? `- **Response Deadline**: ${deadline}` : ''}
        - **Question Types Requested**: 
        ${formatQuestionTypes(questionTypes)}

        ## Output Requirements
        - **First, generate relevant survey questions** based on the question types and survey purpose
        - Create a professional, comprehensive survey launch strategy
        - Include clear communication templates for all stakeholders
        - Provide implementation timeline and logistics
        - Ensure cultural sensitivity and Nigerian educational context
        - Include data collection best practices and participation strategies
        - Keep total length between 1200-1800 words
        - Use professional, engaging language that encourages participation

        ## Structure Template

        # Survey Launch Title: ${surveyTitle}

        ## Survey Overview
        **Survey Title**: ${surveyTitle}  
        **Target Audience**: ${targetAudience}  
        **Launch Date**: ${launchDate}  
        ${deadline ? `**Response Deadline**: ${deadline}` : ''}  
        **Coordinator**: ${coordinatorName}  
        **Strategy Date**: ${currentDate}

        ## Executive Summary
        [2-3 sentences explaining the survey's importance, expected outcomes, and how it will benefit the school community]

        ## Survey Purpose & Objectives

        ### Primary Purpose
        [Elaborate on the purpose/description with specific goals and expected outcomes]

        ### Key Objectives
        - **Data Collection Goals**: [What specific information we're gathering]
        - **Improvement Areas**: [How responses will drive school enhancement]
        - **Stakeholder Engagement**: [How this involves the community]
        - **Decision-Making Support**: [How data will inform school policies]

        ### Success Metrics
        - **Target Response Rate**: [Percentage goal for participation based on audience]
        - **Quality Indicators**: [Measures of response quality]
        - **Timeline Adherence**: [Meeting deadlines and milestones]
        - **Stakeholder Satisfaction**: [Participant experience quality]

        ## AI-Generated Survey Questions

        ### Question Development Process
        [Explain how the questions were crafted to align with the survey purpose and target audience]

        ${questionTypes
          .map((config, index) => {
            let section = `\n### ${config.type.replace('_', ' ')} Questions (${
              config.count
            } questions)`;
            if (config.focus) {
              section += `\n**Focus Area**: ${config.focus}`;
            }
            section += `\n[Generate ${
              config.count
            } well-crafted ${config.type.replace('_', ' ')} question${
              config.count > 1 ? 's' : ''
            } that align with the survey purpose and are appropriate for ${targetAudience}. For each question, provide:]`;

            section += `\n\n#### Question [Number]: [Generated Question Text]`;
            section += `\n- **Type**: ${config.type.replace('_', ' ')}`;
            section += `\n- **Purpose**: [Why this question is important for the survey objectives]`;
            section += `\n- **Expected Insights**: [What we'll learn from responses]`;
            section += `\n- **Required**: [Yes/No with justification]`;

            if (config.type === 'multiple_choice') {
              section += `\n- **Options**: [List 3-5 relevant response options]`;
            } else if (config.type === 'rating') {
              section += `\n- **Scale**: [Define scale range, e.g., 1-5 or 1-10]`;
              section += `\n- **Scale Labels**: [Define what the scale endpoints mean]`;
            } else if (config.type === 'likert_scale') {
              section += `\n- **Scale Options**: [e.g., Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree]`;
            }

            section += `\n\n[Repeat this format for each question of this type]`;
            return section;
          })
          .join('\n')}

        ### Question Validation
        - **Relevance Check**: [Ensure all questions serve the survey purpose]
        - **Audience Appropriateness**: [Verify language and complexity suit ${targetAudience}]
        - **Cultural Sensitivity**: [Confirm questions respect Nigerian educational context]
        - **Bias Prevention**: [Ensure neutral, non-leading questions]

        ## Complete Survey Form

        ### Survey Presentation
        [Create a complete, ready-to-use survey form that participants will see and complete. This should include:]

        ---

        # ${surveyTitle}

        **Instructions**: Please complete this survey honestly and thoroughly. Your responses will help improve our educational programs and services.

        **Estimated Time**: [X] minutes  
        **Deadline**: ${deadline ? deadline : 'No specific deadline'}  
        **Coordinator**: ${coordinatorName}  
        **Contact for Questions**: ${coordinatorContact}

        ---

        [For each generated question, create the appropriate form field format:]

        **Example format for different question types:**

        ### Multiple Choice Questions:
        **Question X**: [Generated question text]
        ☐ Option A
        ☐ Option B  
        ☐ Option C
        ☐ Option D

        ### Short Text Questions:
        **Question X**: [Generated question text]
        _________________________________
        [Answer space]

        ### Rating Questions:
        **Question X**: [Generated question text]
        Scale: 1 (Low) ──────────── 5 (High)
        ☐ 1   ☐ 2   ☐ 3   ☐ 4   ☐ 5

        ### Yes/No Questions:
        **Question X**: [Generated question text]
        ☐ Yes   ☐ No

        ### Likert Scale Questions:
        **Question X**: [Generated question text]
        ☐ Strongly Disagree   ☐ Disagree   ☐ Neutral   ☐ Agree   ☐ Strongly Agree

        [Continue with all generated questions in proper form format]

        ---

        **Thank you for your participation!**
        Please submit your completed survey by ${
          deadline ? deadline : 'the specified deadline'
        }.

        For questions or technical support, contact: ${coordinatorContact}

        ---

        ## Target Audience Analysis

        ### Audience Profile: ${targetAudience}
        - **Demographics**: [Age range, educational level, characteristics]
        - **Accessibility Needs**: [Language preferences, technology access]
        - **Motivation Factors**: [What encourages participation]
        - **Communication Preferences**: [Best ways to reach this audience]

        ### Engagement Strategies
        - **Incentive Programs**: [Rewards or recognition for participation]
        - **Communication Channels**: [Multiple touchpoints for outreach]
        - **Timing Optimization**: [Best times for survey completion]
        - **Follow-up Protocols**: [Reminder and support systems]

        ## Survey Design & User Experience

        ### Question Flow & Organization
        - **Logical Progression**: [How questions build on each other]
        - **Question Grouping**: [Thematic organization]
        - **Estimated Completion Time**: [Based on question count and types]
        - **Mobile Optimization**: [Ensuring accessibility on all devices]

        ### User Experience Considerations
        - **Survey Length**: [Balanced for completion rates]
        - **Question Clarity**: [Age-appropriate and culturally sensitive language]
        - **Progress Indicators**: [Showing completion status]
        - **Skip Logic**: [If applicable, smart question routing]

        ## Delivery Strategy

        ${
          deliveryFormat
            ? `
        ### Primary Delivery Method: ${deliveryFormat}
        [Detailed explanation of how this method will be implemented]
        `
            : ''
        }

        ### Multi-Channel Approach
        - **Digital Channels**: [Online platforms, email, mobile apps]
        - **Physical Distribution**: [Paper forms, classroom sessions]
        - **Hybrid Options**: [QR codes, kiosk stations]
        - **Accessibility Accommodations**: [Special needs considerations]

        ### Technical Requirements
        - **Platform Setup**: [Survey tool configuration]
        - **Data Security**: [Privacy and protection measures]
        - **Backup Systems**: [Alternative collection methods]
        - **Technical Support**: [Help desk and troubleshooting]

        ## Implementation Timeline

        ### Pre-Launch Phase (1-2 weeks before)
        - **Question Finalization**: [Final review of AI-generated questions]
        - **Stakeholder Notification**: [Initial announcements]
        - **Teacher/Staff Briefing**: [Training and preparation]
        - **System Testing**: [Technical validation with sample questions]
        - **Material Preparation**: [Templates, instructions, resources]

        ### Launch Phase (${launchDate})
        - **Official Launch**: [Announcement and initial distribution]
        - **Immediate Support**: [First-day assistance and monitoring]
        - **Participation Tracking**: [Real-time response monitoring]
        - **Quick Adjustments**: [Rapid response to issues]

        ### Active Collection Phase
        - **Daily Monitoring**: [Response rate tracking]
        - **Reminder Campaigns**: [Follow-up communications]
        - **Support Provision**: [Ongoing assistance]
        - **Quality Assurance**: [Response validation]

        ${
          deadline
            ? `
        ### Final Push Phase (Leading to ${deadline})
        - **Final Reminders**: [Last-chance communications]
        - **Extended Support**: [Additional help for late participants]
        - **Data Validation**: [Final quality checks]
        - **Collection Closure**: [Survey shutdown procedures]
        `
            : ''
        }

        ## Communication Templates

        ### Launch Announcement
        **Subject**: Important: ${surveyTitle} - Your Voice Matters!

        Dear ${targetAudience},

        [Professional, engaging message explaining the survey's importance, mentioning the carefully crafted questions designed specifically for your input, and encouraging participation]

        ### Reminder Messages
        **Subject**: Reminder: ${surveyTitle} - We Need Your Input!

        [Friendly reminder emphasizing the value of participation and providing support information]

        ### Support Instructions
        **How to Complete the Survey**:
        1. [Step-by-step instructions]
        2. [Technical requirements]
        3. [Where to get help]

        ## Participation Strategies

        ### Motivation Techniques
        - **Value Proposition**: [Why participation benefits respondents]
        - **Question Relevance**: [How questions address real concerns]
        - **Transparency**: [How results will be used and shared]
        - **Recognition**: [Acknowledging contributions]
        - **Community Building**: [Fostering collective ownership]

        ### Overcoming Barriers
        - **Time Constraints**: [Making participation quick and easy]
        - **Technology Issues**: [Providing alternative options]
        - **Language Barriers**: [Offering multiple language support]
        - **Skepticism**: [Building trust and credibility]

        ## Data Collection Best Practices

        ### Quality Assurance
        - **Response Validation**: [Checking for completeness and accuracy]
        - **Bias Prevention**: [Ensuring representative sampling]
        - **Anonymity Protection**: [Maintaining confidentiality]
        - **Data Integrity**: [Secure storage and handling]

        ### Monitoring & Analytics
        - **Real-time Tracking**: [Live response monitoring]
        - **Demographic Analysis**: [Ensuring balanced participation]
        - **Quality Metrics**: [Response completeness and thoughtfulness]
        - **Technical Performance**: [System reliability and speed]

        ## Risk Management

        ### Potential Challenges
        - **Low Response Rates**: [Strategies to boost participation]
        - **Technical Difficulties**: [Backup plans and support]
        - **Time Constraints**: [Flexibility in deadlines]
        - **Question Misunderstanding**: [Clarification procedures]

        ### Mitigation Strategies
        - **Contingency Plans**: [Alternative approaches]
        - **Escalation Procedures**: [When to seek additional help]
        - **Stakeholder Communication**: [Keeping everyone informed]
        - **Adaptive Management**: [Adjusting strategy as needed]

        ## Results & Follow-up Planning

        ### Data Analysis Timeline
        - **Initial Processing**: [Immediate data review]
        - **Question-by-Question Analysis**: [Detailed insights extraction]
        - **Report Generation**: [Stakeholder-specific summaries]
        - **Action Planning**: [Using results for improvement]

        ### Communication of Results
        - **Stakeholder Reports**: [Tailored feedback for different groups]
        - **Public Sharing**: [Transparent communication of findings]
        - **Action Items**: [Specific next steps based on results]
        - **Follow-up Surveys**: [Measuring impact of changes]

        ## Resource Requirements

        ### Human Resources
        - **Survey Coordination**: [Staff time and responsibilities]
        - **Technical Support**: [IT and troubleshooting needs]
        - **Communication Management**: [Outreach and engagement]
        - **Data Analysis**: [Processing and interpretation skills]

        ### Technology & Materials
        - **Survey Platform**: [Software or tool requirements]
        - **Communication Tools**: [Email, messaging, printing]
        - **Data Storage**: [Secure systems for information]
        - **Support Materials**: [Instructions, guides, FAQs]

        ## Success Evaluation

        ### Quantitative Measures
        - **Response Rate**: [Percentage of target audience participation]
        - **Completion Rate**: [Percentage of started surveys finished]
        - **Data Quality**: [Completeness and consistency metrics]
        - **Timeline Adherence**: [Meeting planned deadlines]

        ### Qualitative Indicators
        - **Participant Feedback**: [Experience and satisfaction]
        - **Question Effectiveness**: [How well questions captured needed data]
        - **Stakeholder Engagement**: [Level of community involvement]
        - **Process Efficiency**: [Smooth implementation]
        - **Outcome Relevance**: [Actionable insights generated]

        ## Conclusion & Next Steps
        [Summarize the launch strategy and emphasize the importance of successful execution for the institution's improvement initiatives. Highlight how the AI-generated questions are specifically designed to capture meaningful data for decision-making.]

        ---

        **Survey Coordinator**: ${coordinatorName}
        **Contact Information**: ${coordinatorContact}  

        **Note**: This survey launch strategy includes AI-generated questions specifically crafted for ${surveyTitle} targeting ${targetAudience}. The questions are designed to maximize response quality and provide actionable insights for the institution's improvement initiatives.

        Execute this comprehensive survey launch strategy with attention to stakeholder engagement, data quality, and actionable outcomes that will benefit the entire school community.
`;
};

//knowledge retrieval quiz tool
export interface KnowledgeRetrievalQuizPromptType {
  subject: string;
  classLevel: string;
  topicOrLessonTitle: string;
  numberOfQuestions?: number;
  difficultyLevel?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
}

export const generateKnowledgeRetrievalQuizPrompt = ({
  subject,
  classLevel,
  topicOrLessonTitle,
  numberOfQuestions = 10,
  difficultyLevel = 'Medium',
}: KnowledgeRetrievalQuizPromptType) => {
  return `
        # Expert Nigerian Educational Quiz Generation Engine

        ## Context
        You are a seasoned Nigerian educational assessment specialist and curriculum expert with 15+ years of experience in creating effective, pedagogically sound quizzes that enhance knowledge retrieval and support student learning. Generate a comprehensive quiz that Nigerian teachers can immediately use to assess student understanding and reinforce learning outcomes.

        ## Input Parameters
        - **Subject**: ${subject}
        - **Class Level**: ${classLevel}
        - **Topic/Lesson Title**: ${topicOrLessonTitle}
        - **Number of Questions**: ${numberOfQuestions}
        - **Difficulty Level**: ${difficultyLevel}

        ## Output Requirements
        - Use clean, simple Markdown formatting
        - Create questions that test knowledge retrieval and comprehension
        - Include diverse question types for comprehensive assessment
        - Provide detailed answer keys with explanations
        - Consider Nigerian educational context and curriculum standards
        - Ensure questions are age-appropriate and culturally relevant

        ## Structure Template

        # Knowledge Retrieval Quiz: ${topicOrLessonTitle} - ${classLevel}

        ## Quiz Overview
        **Subject**: ${subject}  
        **Class Level**: ${classLevel}  
        **Topic**: ${topicOrLessonTitle}  
        **Total Questions**: ${numberOfQuestions}  
        **Difficulty Level**: ${difficultyLevel}  
        **Time Allocation**: [X minutes]  
        **Assessment Type**: Knowledge Retrieval & Comprehension

        ## 📋 Quiz Instructions

        ### For Teachers
        - **Preparation time**: 5 minutes to review questions and setup
        - **Administration time**: [X minutes] for completion
        - **Scoring method**: [Points allocation system]
        - **Pass mark**: [X%] (adjust based on class performance)
        - **Follow-up**: Review incorrect answers with explanations

        ### For Students
        - Read each question carefully before answering
        - Choose the best answer for multiple choice questions
        - Provide clear, complete answers for written responses
        - Manage your time effectively across all questions
        - Review your answers before submission

        ## 📝 Quiz Questions

        ### Section A: Multiple Choice Questions (${Math.ceil(
          numberOfQuestions * 0.4
        )} questions)
        *Choose the correct answer from the options provided*

        **Question 1**
        [Question text related to ${topicOrLessonTitle}]
        
        a) [Option A]
        b) [Option B]
        c) [Option C]
        d) [Option D]

        **Question 2**
        [Question text with Nigerian context/examples]
        
        a) [Option A]
        b) [Option B]
        c) [Option C]
        d) [Option D]

        **Question 3**
        [Question text testing key concept understanding]
        
        a) [Option A]
        b) [Option B]
        c) [Option C]
        d) [Option D]

        [Continue pattern for remaining MCQ questions]

        ### Section B: Short Answer Questions (${Math.ceil(
          numberOfQuestions * 0.3
        )} questions)
        *Provide brief, clear answers (2-3 sentences each)*

        **Question [X]**
        [Question requiring explanation of key concept]
        
        **Answer space**: ________________________

        **Question [X+1]**
        [Question with practical application focus]
        
        **Answer space**: ________________________

        **Question [X+2]**
        [Question connecting to Nigerian context]
        
        **Answer space**: ________________________

        [Continue pattern for remaining short answer questions]

        ### Section C: True/False Questions (${Math.ceil(
          numberOfQuestions * 0.2
        )} questions)
        *Mark T for True or F for False*

        **Question [X]**
        [Statement about ${topicOrLessonTitle}] **( )**

        **Question [X+1]**
        [Statement with common misconception] **( )**

        **Question [X+2]**
        [Statement requiring careful analysis] **( )**

        [Continue pattern for remaining T/F questions]

        ### Section D: Application/Analysis Questions (${Math.ceil(
          numberOfQuestions * 0.1
        )} questions)
        *Demonstrate understanding through practical application*

        **Question [X]**
        [Scenario-based question requiring application of knowledge]
        
        **Answer space**: 
        ________________________________
        ________________________________
        ________________________________

        [Continue pattern if multiple application questions]

        ## 📊 Answer Key & Explanations

        ### Section A: Multiple Choice Answers

        **Question 1**: [Correct answer letter]
        - **Explanation**: [Clear explanation of why this is correct]
        - **Common mistakes**: [Why other options are incorrect]
        - **Learning objective addressed**: [Which objective this tests]

        **Question 2**: [Correct answer letter]
        - **Explanation**: [Clear explanation of why this is correct]
        - **Common mistakes**: [Why other options are incorrect]
        - **Learning objective addressed**: [Which objective this tests]

        [Continue pattern for all MCQ questions]

        ### Section B: Short Answer Model Responses

        **Question [X]**: 
        - **Model answer**: [Comprehensive expected response]
        - **Key points to award marks**: [Bullet points of essential elements]
        - **Partial credit guidelines**: [How to award partial marks]
        - **Common student errors**: [Typical mistakes to watch for]

        [Continue pattern for all short answer questions]

        ### Section C: True/False Answers

        **Question [X]**: [True/False]
        - **Explanation**: [Why this statement is true/false]
        - **Related concept**: [Key concept being tested]

        [Continue pattern for all T/F questions]

        ### Section D: Application Question Rubric

        **Question [X]**: 
        - **Excellent (4 points)**: [Criteria for top performance]
        - **Good (3 points)**: [Criteria for above average]
        - **Satisfactory (2 points)**: [Criteria for average]
        - **Needs improvement (1 point)**: [Criteria for below average]
        - **Sample response**: [Example of excellent answer]

        ## 🎯 Assessment Guidelines

        ### Scoring System
        - **Total points**: [X points]
        - **Section A**: [X points] (1 point per question)
        - **Section B**: [X points] (2 points per question)
        - **Section C**: [X points] (1 point per question)
        - **Section D**: [X points] (4 points per question)

        ### Grade Boundaries
        - **A (90-100%)**: Exceptional understanding
        - **B (80-89%)**: Very good understanding
        - **C (70-79%)**: Good understanding
        - **D (60-69%)**: Satisfactory understanding
        - **F (Below 60%)**: Needs additional support

        ### Differentiation Strategies
        - **For struggling students**: Focus on Sections A and C first
        - **For advanced students**: Emphasize Sections B and D
        - **For ELL students**: Provide vocabulary support
        - **For different learning styles**: Use visual aids during review

        ## 🔄 Post-Quiz Activities

        ### Immediate Follow-up
        1. **Quick review**: Go through answers immediately after completion
        2. **Peer discussion**: Students discuss challenging questions in pairs
        3. **Error analysis**: Identify common mistakes for whole-class review
        4. **Misconception addressing**: Clarify any widespread misunderstandings

        ### Extended Learning
        1. **Remediation plan**: For students scoring below 60%
        2. **Extension activities**: For students scoring above 90%
        3. **Homework assignment**: Practice questions on weak areas
        4. **Study group formation**: Peer tutoring partnerships

        ## 🎓 Professional Development Notes

        ### For Teachers
        - **Question analysis**: Track which questions students find most difficult
        - **Curriculum alignment**: Ensure questions match learning objectives
        - **Item difficulty**: Adjust future questions based on performance
        - **Cultural sensitivity**: Verify all examples are appropriate and inclusive

        ### Assessment Best Practices
        - **Timing**: Allow sufficient time without rushing
        - **Environment**: Ensure quiet, comfortable testing conditions
        - **Feedback**: Provide constructive feedback on performance
        - **Record keeping**: Maintain performance data for progress tracking

        ## 📈 Performance Analytics

        ### Class Performance Indicators
        - **Average score**: [To be calculated]
        - **Question difficulty ranking**: [Based on student performance]
        - **Learning objective mastery**: [Percentage achieving each objective]
        - **Areas for reteaching**: [Topics requiring additional instruction]

        ### Individual Student Analysis
        - **Strength areas**: [Based on question performance]
        - **Improvement areas**: [Based on missed questions]
        - **Learning style preferences**: [Inferred from question type performance]
        - **Recommended interventions**: [Specific support strategies]

        ---

        **Implementation Notes**:
        - Preview all questions before administration
        - Prepare alternative assessment for absent students
        - Have extra pencils and paper ready
        - Consider read-aloud options for struggling readers
        - Plan for different completion times
        - Keep answer sheets secure and confidential

        Generate this knowledge retrieval quiz with specific, grade-appropriate questions that Nigerian educators can use immediately to assess student understanding and support learning in their classrooms.
`;
};

//activity idea generator
export interface ActivityIdeaGeneratorPromptType {
  subject: string;
  classLevel: string;
  topicOrTheme: string;
  learningObjective?: string;
  numberOfIdeas?: number;
}

export const generateActivityIdeaGeneratorPrompt = ({
  subject,
  classLevel,
  topicOrTheme,
  learningObjective = 'To enhance understanding and engagement with the topic',
  numberOfIdeas = 4,
}: ActivityIdeaGeneratorPromptType) => {
  return `
        # Expert Nigerian Educational Activity Idea Generator

        ## Context
        You are a seasoned Nigerian educational activities specialist and curriculum innovation expert with 15+ years of experience in designing engaging, practical learning activities that maximize student participation and knowledge retention. Generate creative, culturally relevant, and immediately implementable activity ideas that Nigerian teachers can use to transform their lessons and enhance student learning outcomes.

        ## Input Parameters
        - **Subject**: ${subject}
        - **Class Level**: ${classLevel}
        - **Topic/Theme**: ${topicOrTheme}
        - **Learning Objective**: ${learningObjective}
        - **Number of Ideas**: ${numberOfIdeas}

        ## Output Requirements
        - Use clean, simple Markdown formatting
        - Create diverse activity types for different learning styles
        - Provide step-by-step implementation guidance
        - Include material lists considering Nigerian classroom contexts
        - Offer differentiation strategies for mixed-ability classes
        - Consider varying levels of technology access and infrastructure

        ## Structure Template

        # Activity Ideas: ${topicOrTheme} - ${classLevel}

        ## Activity Overview
        **Subject**: ${subject}  
        **Class Level**: ${classLevel}  
        **Topic/Theme**: ${topicOrTheme}  
        **Learning Objective**: ${learningObjective}  
        **Number of Activities**: ${numberOfIdeas}  
        **Activity Types**: Diverse approaches for comprehensive engagement

        ## 🎯 Activity Collection

        ### Activity 1: [Creative Activity Name]
        **Type**: [Individual/Pair/Group] | **Duration**: [X minutes] | **Difficulty**: [Easy/Medium/Hard]

        #### 📝 Activity Description
        [Engaging description of what students will do, written in clear, actionable language]

        #### 🎓 Learning Outcomes
        Students will be able to:
        - [Specific skill/knowledge outcome 1]
        - [Specific skill/knowledge outcome 2]
        - [Specific skill/knowledge outcome 3]
        - [Connection to broader curriculum goals]

        #### 🛠️ Materials Needed
        **Essential Items**:
        - [List of required materials accessible in Nigerian classrooms]
        - [Alternative materials if primary ones unavailable]
        - [Technology requirements (if any)]

        **Optional Enhancements**:
        - [Additional materials for extended activities]
        - [Digital tools for tech-enabled classrooms]

        #### 📋 Step-by-Step Implementation

        **Preparation (5 minutes)**:
        1. [Teacher preparation step]
        2. [Material setup instructions]
        3. [Classroom arrangement guidance]

        **Introduction (5 minutes)**:
        1. [Hook/attention grabber]
        2. [Learning objective explanation]
        3. [Activity instructions delivery]

        **Main Activity (X minutes)**:
        1. [Detailed step 1 with teacher actions]
        2. [Detailed step 2 with student actions]
        3. [Detailed step 3 with monitoring guidance]
        4. [Additional steps as needed]

        **Wrap-up (5 minutes)**:
        1. [Reflection questions]
        2. [Key takeaways summary]
        3. [Connection to next lesson]

        #### 🔄 Differentiation Strategies
        **For Struggling Students**:
        - [Specific adaptations and supports]
        - [Simplified instructions or materials]
        - [Peer support strategies]

        **For Advanced Students**:
        - [Extension activities and challenges]
        - [Leadership opportunities]
        - [Independent exploration options]

        **For English Language Learners**:
        - [Visual aids and demonstrations]
        - [Bilingual support strategies]
        - [Culturally relevant examples]

        #### 📊 Assessment Integration
        **Formative Assessment**:
        - [Ongoing observation checkpoints]
        - [Quick comprehension checks]
        - [Peer feedback opportunities]

        **Summative Options**:
        - [End-of-activity evaluation methods]
        - [Portfolio contribution possibilities]
        - [Rubric-based assessments]

        #### 🌍 Nigerian Context Integration
        - [Local examples and cultural references]
        - [Community connections and applications]
        - [Real-world relevance for Nigerian students]

        #### 💡 Teacher Tips
        - [Common challenges and solutions]
        - [Time management strategies]
        - [Engagement maintenance techniques]
        - [Safety considerations (if applicable)]

        ---

        ### Activity 2: [Interactive Activity Name]
        **Type**: [Individual/Pair/Group] | **Duration**: [X minutes] | **Difficulty**: [Easy/Medium/Hard]

        #### 📝 Activity Description
        [Engaging description focusing on interactive elements and student participation]

        #### 🎓 Learning Outcomes
        Students will be able to:
        - [Specific skill/knowledge outcome 1]
        - [Specific skill/knowledge outcome 2]
        - [Specific skill/knowledge outcome 3]
        - [Collaborative/social learning outcome]

        #### 🛠️ Materials Needed
        **Essential Items**:
        - [List of required materials with Nigerian availability in mind]
        - [Low-cost/no-cost alternatives]
        - [Recyclable/reusable materials]

        **Optional Enhancements**:
        - [Technology integration options]
        - [Multimedia resources]

        #### 📋 Step-by-Step Implementation

        **Preparation (X minutes)**:
        1. [Setup instructions]
        2. [Student grouping strategies]
        3. [Material distribution plan]

        **Introduction (X minutes)**:
        1. [Activation strategy]
        2. [Rule establishment]
        3. [Demonstration/modeling]

        **Main Activity (X minutes)**:
        1. [Phase 1 with clear transitions]
        2. [Phase 2 with monitoring points]
        3. [Phase 3 with facilitation tips]
        4. [Closure and sharing]

        **Wrap-up (X minutes)**:
        1. [Reflection activities]
        2. [Learning consolidation]
        3. [Preview of next steps]

        #### 🔄 Differentiation Strategies
        **For Struggling Students**:
        - [Targeted support mechanisms]
        - [Modified participation options]
        - [Additional scaffolding]

        **For Advanced Students**:
        - [Complex challenge variations]
        - [Mentoring opportunities]
        - [Cross-curricular connections]

        **For Different Learning Styles**:
        - [Visual learner adaptations]
        - [Auditory learner accommodations]
        - [Kinesthetic learner modifications]

        #### 📊 Assessment Integration
        **Formative Assessment**:
        - [Real-time feedback mechanisms]
        - [Peer evaluation components]
        - [Self-reflection opportunities]

        **Summative Options**:
        - [Product-based assessments]
        - [Performance evaluations]
        - [Portfolio inclusions]

        #### 🌍 Nigerian Context Integration
        - [Local industry connections]
        - [Cultural celebration ties]
        - [Community problem-solving applications]

        #### 💡 Teacher Tips
        - [Classroom management strategies]
        - [Resource conservation tips]
        - [Student motivation techniques]
        - [Adaptation for large classes]

        ---

        ### Activity 3: [Hands-On Activity Name]
        **Type**: [Individual/Pair/Group] | **Duration**: [X minutes] | **Difficulty**: [Easy/Medium/Hard]

        [Follow same detailed structure as Activities 1 and 2]

        ---

        ### Activity 4: [Technology-Enhanced Activity Name]
        **Type**: [Individual/Pair/Group] | **Duration**: [X minutes] | **Difficulty**: [Easy/Medium/Hard]

        [Follow same detailed structure, with emphasis on technology integration and low-tech alternatives]

        ---

        [Continue pattern for remaining activities based on numberOfIdeas]

        ## 🔧 Implementation Support

        ### Technology Considerations
        **High-Tech Classrooms**:
        - [Digital tool integration strategies]
        - [Online collaboration options]
        - [Multimedia enhancement possibilities]

        **Low-Tech Classrooms**:
        - [Paper-based alternatives]
        - [Analog material utilization]
        - [Manual process adaptations]

        **Mixed-Tech Environments**:
        - [Hybrid approach strategies]
        - [Rotation system implementations]
        - [Equity considerations]

        ### Classroom Management
        **Large Class Strategies**:
        - [Group management techniques]
        - [Resource distribution systems]
        - [Noise control methods]

        **Small Class Adaptations**:
        - [Intimate setting utilization]
        - [Individual attention opportunities]
        - [Peer collaboration maximization]

        **Mixed-Ability Classes**:
        - [Tiered activity approaches]
        - [Flexible grouping strategies]
        - [Multiple success pathways]

        ### Resource Management
        **Cost-Effective Solutions**:
        - [Budget-friendly material alternatives]
        - [Reusable resource creation]
        - [Community resource partnerships]

        **Sustainability Practices**:
        - [Eco-friendly material choices]
        - [Long-term resource planning]
        - [Student responsibility integration]

        ## 📈 Activity Effectiveness Tracking

        ### Success Indicators
        **Student Engagement Metrics**:
        - [Participation level observations]
        - [Enthusiasm and interest signs]
        - [Voluntary contribution frequency]

        **Learning Outcome Achievement**:
        - [Objective mastery evidence]
        - [Skill demonstration quality]
        - [Knowledge retention indicators]

        **Practical Implementation**:
        - [Setup time efficiency]
        - [Material usage effectiveness]
        - [Transition smoothness]

        ### Continuous Improvement
        **Student Feedback Integration**:
        - [Activity preference surveys]
        - [Difficulty level assessments]
        - [Suggestion collection methods]

        **Teacher Reflection Points**:
        - [What worked well analysis]
        - [Challenge identification]
        - [Modification opportunities]

        **Colleague Collaboration**:
        - [Peer observation benefits]
        - [Shared resource development]
        - [Best practice exchanges]

        ## 🎨 Creative Variations

        ### Seasonal Adaptations
        - [Holiday and festival integrations]
        - [Weather-appropriate modifications]
        - [Cultural celebration connections]

        ### Cross-Curricular Extensions
        - [Subject integration opportunities]
        - [Skill transfer applications]
        - [Holistic learning approaches]

        ### Community Connections
        - [Local expert involvement]
        - [Field trip preparation activities]
        - [Real-world application projects]

        ## 🎓 Professional Development

        ### Activity Design Principles
        - [Engagement theory applications]
        - [Learning style accommodations]
        - [Assessment integration strategies]

        ### Adaptation Skills
        - [Flexibility development]
        - [Resource optimization]
        - [Innovation encouragement]

        ### Reflection Practices
        - [Activity effectiveness evaluation]
        - [Student impact assessment]
        - [Professional growth planning]

        ---

        **Implementation Reminders**:
        - Test activities in small groups first
        - Prepare backup plans for each activity
        - Consider time zones and cultural sensitivities
        - Keep student safety as top priority
        - Document successful adaptations for future use
        - Collaborate with colleagues for resource sharing

        Generate ${numberOfIdeas} creative, practical, and immediately implementable activity ideas that Nigerian educators can use to enhance student engagement and learning in their ${subject} classes, with full consideration for local contexts, resources, and cultural relevance.
`;
};

//concept explainer
export interface ConceptExplainerPromptType {
  subject: string;
  classLevel: string;
  topic: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredStyle?:
    | 'analogies'
    | 'examples'
    | 'step-by-step'
    | 'visual'
    | 'storytelling'
    | 'mixed';
}

export const generateConceptExplainerPrompt = ({
  subject,
  classLevel,
  topic,
  difficulty = 'Intermediate',
  preferredStyle = 'mixed',
}: ConceptExplainerPromptType) => {
  return `
        # Expert Nigerian Educational Concept Explainer Engine

        ## Context
        You are a master Nigerian educator and concept communication specialist with 15+ years of experience in breaking down complex ideas into clear, understandable explanations. You excel at making difficult concepts accessible to students while maintaining academic rigor and cultural relevance. Generate comprehensive concept explanations that Nigerian teachers can use immediately to enhance student understanding and engagement.

        ## Input Parameters
        - **Subject**: ${subject}
        - **Class Level**: ${classLevel}
        - **Topic**: ${topic}
        - **Difficulty Level**: ${difficulty}
        - **Preferred Style**: ${preferredStyle}

        ## Output Requirements
        - Use clean, simple Markdown formatting
        - Maintain age-appropriate language and complexity
        - Include culturally relevant examples and analogies
        - Provide multiple explanation approaches for different learning styles
        - Consider varying levels of prior knowledge and experience
        - Ensure immediate practical application for Nigerian educators

        ## Structure Template

        # Concept Explanation: ${topic} - ${classLevel}

        ## Explanation Overview
        **Subject**: ${subject}  
        **Class Level**: ${classLevel}  
        **Topic**: ${topic}  
        **Difficulty Level**: ${difficulty}  
        **Explanation Style**: ${preferredStyle}  
        **Target Understanding**: Clear comprehension with practical application

        ## 🎯 Learning Objectives
        By the end of this explanation, students will be able to:
        - [Primary learning objective - what students will understand]
        - [Secondary objective - how they will apply the knowledge]
        - [Tertiary objective - connections they will make]
        - [Assessment objective - how they will demonstrate understanding]

        ## 📚 Foundational Knowledge Check
        **Before we begin, students should understand**:
        - [Prerequisite concept 1 with quick definition]
        - [Prerequisite concept 2 with quick definition]
        - [Prerequisite concept 3 with quick definition]
        - [Key vocabulary terms they need to know]

        **Quick Pre-Assessment Questions**:
        1. [Simple question to gauge prior knowledge]
        2. [Question to identify misconceptions]
        3. [Question to assess readiness level]

        ## 🌟 Main Concept Explanation

        ### Core Definition
        **${topic}** is [clear, concise definition in student-friendly language]

        **Key Points to Remember**:
        - [Essential point 1]
        - [Essential point 2]
        - [Essential point 3]
        - [Essential point 4]

        ### ${
          preferredStyle === 'analogies'
            ? '🔗 Analogy-Based Explanation'
            : preferredStyle === 'examples'
            ? '📝 Example-Based Explanation'
            : preferredStyle === 'step-by-step'
            ? '👣 Step-by-Step Explanation'
            : preferredStyle === 'visual'
            ? '🎨 Visual Explanation'
            : preferredStyle === 'storytelling'
            ? '📖 Story-Based Explanation'
            : '🎭 Multi-Style Explanation'
        }

        ${
          preferredStyle === 'analogies' || preferredStyle === 'mixed'
            ? `
        #### 🔗 Understanding Through Analogies
        
        **Primary Analogy**: [Nigerian cultural reference or familiar concept]
        Think of ${topic} like [detailed analogy explanation using familiar Nigerian context - markets, family structures, local practices, etc.]
        
        **Connection Points**:
        - [Analogy element 1] relates to [concept element 1] because [explanation]
        - [Analogy element 2] relates to [concept element 2] because [explanation]
        - [Analogy element 3] relates to [concept element 3] because [explanation]
        
        **Alternative Analogies**:
        - [Secondary analogy for different student backgrounds]
        - [Tertiary analogy for kinesthetic learners]
        - [Sports/game analogy for engagement]
        `
            : ''
        }

        ${
          preferredStyle === 'examples' || preferredStyle === 'mixed'
            ? `
        #### 📝 Real-World Examples
        
        **Primary Example**: [Detailed Nigerian-context example]
        In Nigeria, we can see ${topic} in action when [specific, relatable example with step-by-step breakdown]
        
        **Example Breakdown**:
        1. [First part of example with concept connection]
        2. [Second part of example with concept connection]
        3. [Third part of example with concept connection]
        4. [Conclusion showing concept in action]
        
        **Additional Examples**:
        - **Local Context**: [Community/regional example]
        - **Historical Context**: [Nigerian historical reference]
        - **Contemporary Context**: [Current events or modern applications]
        - **Personal Context**: [Student life application]
        `
            : ''
        }

        ${
          preferredStyle === 'step-by-step' || preferredStyle === 'mixed'
            ? `
        #### 👣 Step-by-Step Breakdown
        
        **Step 1: [Foundation Step]**
        - What happens: [Clear description]
        - Why it matters: [Importance explanation]
        - Student action: [What students should do/think]
        - Example: [Quick illustration]
        
        **Step 2: [Building Step]**
        - What happens: [Clear description]
        - Why it matters: [Importance explanation]
        - Student action: [What students should do/think]
        - Example: [Quick illustration]
        
        **Step 3: [Development Step]**
        - What happens: [Clear description]
        - Why it matters: [Importance explanation]
        - Student action: [What students should do/think]
        - Example: [Quick illustration]
        
        **Step 4: [Application Step]**
        - What happens: [Clear description]
        - Why it matters: [Importance explanation]
        - Student action: [What students should do/think]
        - Example: [Quick illustration]
        
        **Step 5: [Mastery Step]**
        - What happens: [Clear description]
        - Why it matters: [Importance explanation]
        - Student action: [What students should do/think]
        - Example: [Quick illustration]
        `
            : ''
        }

        ${
          preferredStyle === 'visual' || preferredStyle === 'mixed'
            ? `
        #### 🎨 Visual Representation Guide
        
        **Mental Picture Creation**:
        Imagine ${topic} as [detailed visual description that students can picture in their minds]
        
        **Visual Elements**:
        - [Visual component 1]: Represents [concept element]
        - [Visual component 2]: Represents [concept element]
        - [Visual component 3]: Represents [concept element]
        - [Visual component 4]: Shows the relationship between [elements]
        
        **Drawing Activity**:
        Students can draw ${topic} by:
        1. [Drawing instruction 1]
        2. [Drawing instruction 2]
        3. [Drawing instruction 3]
        4. [Labeling instructions]
        
        **Visual Mnemonics**:
        - [Memory aid 1 with visual component]
        - [Memory aid 2 with visual component]
        - [Memory aid 3 with visual component]
        `
            : ''
        }

        ${
          preferredStyle === 'storytelling' || preferredStyle === 'mixed'
            ? `
        #### 📖 Story-Based Understanding
        
        **The Story of ${topic}**:
        [Engaging narrative that explains the concept through storytelling, using Nigerian cultural context, folklore elements, or modern scenarios]
        
        **Story Characters**:
        - [Character 1]: Represents [concept element]
        - [Character 2]: Represents [concept element]
        - [Character 3]: Represents [concept element]
        
        **Story Plot Points**:
        1. [Beginning]: [How the concept starts/is introduced]
        2. [Conflict]: [Challenge or problem related to the concept]
        3. [Development]: [How the concept unfolds/develops]
        4. [Resolution]: [How the concept concludes/is applied]
        
        **Moral/Lesson**: [Key takeaway that reinforces the concept]
        `
            : ''
        }

        ## 🔍 Deep Dive Analysis

        ### Why This Concept Matters
        **Academic Importance**:
        - [Connection to curriculum standards]
        - [Foundation for advanced topics]
        - [Cross-curricular applications]

        **Real-World Relevance**:
        - [Career applications in Nigeria]
        - [Daily life applications]
        - [Societal impact and importance]

        **Critical Thinking Connections**:
        - [How this concept relates to other ideas]
        - [Questions students should ask]
        - [Debates or discussions it generates]

        ### Common Misconceptions
        **Misconception 1**: [Incorrect understanding students often have]
        - **Why it's wrong**: [Clear explanation]
        - **Correct understanding**: [Accurate explanation]
        - **How to remember**: [Memory aid or trick]

        **Misconception 2**: [Another common error]
        - **Why it's wrong**: [Clear explanation]
        - **Correct understanding**: [Accurate explanation]
        - **How to remember**: [Memory aid or trick]

        **Misconception 3**: [Third common mistake]
        - **Why it's wrong**: [Clear explanation]
        - **Correct understanding**: [Accurate explanation]
        - **How to remember**: [Memory aid or trick]

        ## 🎯 Differentiated Explanations

        ### For Struggling Students
        **Simplified Explanation**:
        [Reduced complexity version focusing on core essentials]

        **Additional Support**:
        - [Extra practice opportunities]
        - [Peer support strategies]
        - [Alternative learning approaches]
        - [Confidence-building activities]

        ### For Advanced Students
        **Extended Explanation**:
        [More complex connections and applications]

        **Challenge Opportunities**:
        - [Advanced questions to explore]
        - [Research projects or extensions]
        - [Leadership roles in peer teaching]
        - [Cross-curricular connections]

        ### For Different Learning Styles
        **Visual Learners**:
        - [Diagrams and visual representations]
        - [Color coding and organization]
        - [Spatial relationships]

        **Auditory Learners**:
        - [Verbal explanations and discussions]
        - [Songs, rhymes, or chants]
        - [Audio recordings and presentations]

        **Kinesthetic Learners**:
        - [Hands-on activities and manipulatives]
        - [Movement-based learning]
        - [Physical demonstrations]

        ## 🔄 Practical Applications

        ### Immediate Applications
        **In This Subject**:
        - [How concept applies to current curriculum]
        - [Upcoming topics that build on this]
        - [Assessment applications]

        **In Other Subjects**:
        - [Cross-curricular connections]
        - [Interdisciplinary applications]
        - [Skill transfer opportunities]

        ### Long-term Applications
        **Future Academic Work**:
        - [Advanced courses that use this concept]
        - [Research opportunities]
        - [Higher education connections]

        **Career Applications**:
        - [Relevant Nigerian career paths]
        - [Professional skills development]
        - [Entrepreneurship opportunities]

        **Life Applications**:
        - [Personal decision making]
        - [Community involvement]
        - [Civic responsibility]

        ## 📊 Comprehension Checks

        ### Quick Understanding Checks
        **During Explanation**:
        1. [Simple question to check basic understanding]
        2. [Question to identify confusion points]
        3. [Question to gauge depth of understanding]

        **Post-Explanation**:
        1. [Summary question requiring explanation]
        2. [Application question using new context]
        3. [Connection question linking to prior knowledge]

        ### Self-Assessment Questions
        **Students can ask themselves**:
        - Can I explain this concept to a friend?
        - Can I give my own example?
        - Do I understand why this is important?
        - Can I connect this to something I already know?

        ## 🎓 Teaching Implementation Guide

        ### Lesson Structure Suggestions
        **Introduction (10 minutes)**:
        - [Hook activity or question]
        - [Prior knowledge activation]
        - [Learning objective sharing]

        **Main Explanation (20-30 minutes)**:
        - [Core concept delivery]
        - [Chosen explanation style implementation]
        - [Student interaction points]

        **Practice and Application (15 minutes)**:
        - [Immediate practice opportunities]
        - [Guided application activities]
        - [Peer discussion time]

        **Wrap-up (5 minutes)**:
        - [Summary of key points]
        - [Preview of next steps]
        - [Final comprehension check]

        ### Materials and Resources
        **Essential Materials**:
        - [Basic classroom supplies needed]
        - [Visual aids or props]
        - [Worksheets or handouts]

        **Technology Integration**:
        - [Digital tools for enhancement]
        - [Online resources for extension]
        - [Multimedia applications]

        **Alternative Resources**:
        - [Low-tech alternatives]
        - [Community resources]
        - [Student-created materials]

        ## 🌍 Cultural Sensitivity and Relevance

        ### Nigerian Context Integration
        **Cultural Examples**:
        - [Traditional practices that illustrate the concept]
        - [Modern Nigerian applications]
        - [Regional variations and considerations]

        **Language Considerations**:
        - [Local language connections]
        - [Technical vocabulary explanations]
        - [Communication style preferences]

        **Inclusive Practices**:
        - [Diverse perspective inclusion]
        - [Gender-sensitive examples]
        - [Socioeconomic considerations]

        ## 🔄 Assessment and Reflection

        ### Formative Assessment Ideas
        **Exit Tickets**:
        - [Quick understanding check questions]
        - [Misconception identification]
        - [Application challenges]

        **Peer Assessment**:
        - [Partner explanation activities]
        - [Peer teaching opportunities]
        - [Collaborative understanding building]

        ### Summative Assessment Options
        **Traditional Assessments**:
        - [Quiz question suggestions]
        - [Test item examples]
        - [Rubric considerations]

        **Alternative Assessments**:
        - [Project-based applications]
        - [Portfolio inclusions]
        - [Performance demonstrations]

        ## 💡 Extension and Enrichment

        ### Further Exploration
        **Research Topics**:
        - [Related concepts to investigate]
        - [Historical development of the concept]
        - [Current applications and innovations]

        **Creative Projects**:
        - [Art integration opportunities]
        - [Writing applications]
        - [Presentation challenges]

        ### Community Connections
        **Local Experts**:
        - [Community members who use this concept]
        - [Professional guest speakers]
        - [Field trip opportunities]

        **Service Learning**:
        - [Community application projects]
        - [Social impact initiatives]
        - [Civic engagement opportunities]

        ---

        **Implementation Success Tips**:
        - Practice the explanation yourself before delivery
        - Prepare for common student questions
        - Have multiple examples ready
        - Check for understanding frequently
        - Encourage student questions and discussions
        - Connect to students' personal experiences
        - Use wait time effectively after questions

        Generate a comprehensive, culturally relevant explanation of ${topic} that Nigerian ${classLevel} students can understand and apply, using ${preferredStyle} approach at a ${difficulty} level, with full consideration for diverse learning needs and local educational contexts.
`;
};
