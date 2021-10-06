import PropTypes from 'prop-types';
import { Input } from 'antd';
import React, { useState } from 'react';
import { isEmptyText } from '../utils/board-utils';

export const FormCreation = (props) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async (event, callback, text) => {
        event.preventDefault();
        if (loading || isEmptyText(text)) {
            return;
        }
        setLoading(true);
        await callback(text);
        setText('');
        setLoading(false);
    };

    const { onCreate, placeholder } = props;
    return (
        <form onSubmit={(event) => handleCreate(event, onCreate, text)}>
            <Input
                onChange={(event) => setText(event.target.value)}
                value={text}
                placeholder={placeholder}
                disabled={loading}
            />
        </form>
    );
};

FormCreation.propTypes = {
    onCreate: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};
