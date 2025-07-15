import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf';

function RTE({ label, name = "content", control, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        value={value}
                        apiKey={conf.tinyMceApiKey}
                        onEditorChange={onChange}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap",
                                "preview", "anchor", "searchreplace", "visualblocks",
                                "code", "fullscreen", "insertdatetime", "media",
                                "table", "help", "wordcount"
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
