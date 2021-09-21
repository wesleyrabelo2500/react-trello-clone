import { Input } from 'antd';
import React, { useState } from 'react';

export const FormCreation = (props) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = (event, callback, text) => {
        event.preventDefault();
        if (loading || !text || !text.trim()) {
            return;
        }
        setLoading(true);
        callback(text).then(() => {
            setText('');
            setLoading(false);
        });
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const { onCreate, placeholder } = props;
    return (
        <form onSubmit={(event) => handleCreate(event, onCreate, text)}>
            <Input
                onChange={(event) => handleInputChange(event)}
                value={text}
                placeholder={placeholder}
                disabled={loading}
            />
        </form>
    );
};
