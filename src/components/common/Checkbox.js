import React, { useState } from "react";

export function Checkbox(value) {
    const [checked, setChecked] = useState(false);
    const space = " ";

    return (
        <label>
            <input type="checkbox"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
                value={checked}
            />
            {space + value}
        </label>
    );
}