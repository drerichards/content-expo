type AppFrameLayoutProps = {
  regionTop: React.ReactNode;
  regionLeft: React.ReactNode;
  regionMain: React.ReactNode;
};

export const AppFrameLayout = ({
  regionTop,
  regionLeft,
  regionMain,
}: AppFrameLayoutProps) => {
  return (
    <div className="appFrame">
      <div className="appFrameTop">{regionTop}</div>
      <div className="appFrameBody">
        <div className="appFrameLeft">{regionLeft}</div>
        <div className="appFrameMain">{regionMain}</div>
      </div>
    </div>
  );
};
