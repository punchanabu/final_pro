import { postNote } from "./api.js";

export const prepare = (note,files) => {
    
    const formData = new FormData();

    formData.append("note",JSON.stringify(note));

    files.forEach((file,index) => {
        formData.append(`attachment${index + 1}`, file);
    })
    
    
    return formData;
}

export const create = (noteData,fileInputs) => {

    const formData = prepare(noteData,fileInputs);

    postNote(formData); 
}
export const handleSubmit = () => {
    
    const name = document.getElementById('content-share-note-input').value;
    const description = document.getElementById('content-share-note-description').value;
    const tags = getAllTags();

    const noteData = {
        name,
        description,
        tags
    }

    const fileInputs = document.getElementById('fileInput'); ;
    console.log("fileInput: ", fileInput);  // Debugging line
    console.log("fileInput.files: ", fileInput.files);  // Debugging line
    const files = Array.from(fileInputs.files)

    create(noteData,files)
}

const getAllTags = () => {
    const tagElements = document.querySelectorAll('.uploaded-tag');
    const tags = [];

    tagElements.forEach(tagElement => {
        tags.push(tagElement.getAttribute('data-tag'));
    });

    return tags;
}