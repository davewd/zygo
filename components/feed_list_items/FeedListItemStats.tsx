interface FeedListItemStatsProps {
  comments?: number;
  shares?: number;
  likes?: number;
}

const FeedListItemStats: React.FC<FeedListItemStatsProps> = ({
  comments = 0,
  shares = 0,
  likes = 0,
}) => {
  const stats = [];

  if (comments > 0) {
    stats.push(`${comments} comment${comments === 1 ? '' : 's'}`);
  }
  if (shares > 0) {
    stats.push(`${shares} share${shares === 1 ? '' : 's'}`);
  }
  if (likes > 0) {
    stats.push(`${likes} like${likes === 1 ? '' : 's'}`);
  }

  if (stats.length === 0) {
    return null;
  }

  return (
    <small className="text-gray-500 text-sm">
      {stats.join(', ')}
    </small>
  );
};

export default FeedListItemStats;