const WorkInProgress = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <div className="min-h-screen bg-light-background-color flex flex-col items-center justify-center text-center px-4">
      <div className="container">
        <div className="progress-container text-gray-700">
          <div className="working-icon">⚡</div>
          <div className="progress-title">{pageTitle} Under Construction!</div>
          <div className="progress-description">
            Our team is hard at work crafting something amazing. We're building
            something special just for you! Please check back later.
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
          <div className="progress-text">
            Development Progress: 75% Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
