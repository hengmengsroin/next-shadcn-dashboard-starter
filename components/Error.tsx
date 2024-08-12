const ErrorRefresh = ({
  onRefreshClick,
  error
}: {
  onRefreshClick?: () => void;
  error?: string | null;
}) => {
  return (
    <div className="h-full w-full flex-col gap-4">
      <div>{error ?? 'Oops, something went wrong.'}</div>
      <button className="btn btn-primary" onClick={onRefreshClick}>
        Refresh
      </button>
    </div>
  );
};
export default ErrorRefresh;
