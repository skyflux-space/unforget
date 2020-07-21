import PropTypes from 'prop-types'

export const NoteType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
        }).isRequired),
    ]).isRequired,
})