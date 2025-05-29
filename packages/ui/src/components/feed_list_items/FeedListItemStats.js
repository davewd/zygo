import { jsx as _jsx } from "react/jsx-runtime";
const FeedListItemStats = ({ comments = 0, shares = 0, likes = 0, }) => {
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
    return (_jsx("small", { className: "text-gray-500 text-sm", children: stats.join(', ') }));
};
export default FeedListItemStats;
