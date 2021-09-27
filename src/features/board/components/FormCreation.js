import { Input } from 'antd';
import React, { useState } from 'react';
import formValidator from '../../../shared/utils/validators';

export const FormCreation = (props) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async (event, callback, text) => {
        event.preventDefault();
        if (formValidator(loading, text)) {
            return;
        }
        setLoading(true);
        
        await callback(text);
        setText('');
        setLoading(false);
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
