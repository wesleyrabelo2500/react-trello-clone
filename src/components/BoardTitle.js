import PropTypes from 'prop-types';

export const BoardTitle = ({ title, action, addition }) => (
    <div
        role="button"
        tabIndex="0"
        onKeyDown={(e) => action()}
        onClick={(e) => action()}
        className={`h-32 rounded-md p-2 font-semibold flex ${
            addition ? 'bg-gray-200 text-gray-900' : 'bg-blue-500 text-white'
        }`}
    >
        <div className={`${addition && 'm-auto'}`}>{title}</div>
    </div>
);

BoardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    addition: PropTypes.bool,
    action: PropTypes.func,
};
