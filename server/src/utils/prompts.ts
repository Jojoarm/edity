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
