import { handleSubmit } from "../createNote.js";

export const renderUploadPage = () => {

    // rendering component
    document.getElementById('app').innerHTML = 
    `
    <div class = content-share-note>
        <input id = "content-share-note-input" placeholder = "ชื่อโน็ต"></input>
        <div>
            <textarea id = "content-share-note-description" placeholder = "รายละเอียด" rows="4" cols="50"></textarea>
        </div>
        <div>
            <input id = "content-share-note-tag" placeholder = "แท๊ก"></input>
            <button id = "content-share-note-tag-button">เพิ่มแท๊ก</input>
        </div>
        <div id = "tag-upload-list">

        </div>
        <div id = "content-share-note-button-file">
            <input type="file" id="fileInput" accept="image/*" multiple style = "display:none" >
            <label for="fileInput" class="custom-file-upload">เลือกไฟล์</label>
            <div id="selected-files"></div>
            <button id = "content-share-note-button">อัพโหลด</button>
        </div>
    </div>
    `;
    
    // handle submit button
    document.getElementById('content-share-note-button').addEventListener("click", handleSubmit);
    document.getElementById('content-share-note-tag-button').addEventListener("click",uploadTag);
    document.getElementById('fileInput').addEventListener('change', function() {
        const selectedFilesDiv = document.getElementById('selected-files');
        const files = this.files;
    
        // Clear the div first
        selectedFilesDiv.innerHTML = '';
    
        for(let i = 0; i < files.length; i++) {
            const fileDiv = document.createElement('div');
            fileDiv.textContent = files[i].name;
            selectedFilesDiv.appendChild(fileDiv);
        }
    });
}

const uploadTag = () => {
    
    const tagValue = document.getElementById('content-share-note-tag').value.trim();

    // Check if tagValue is not empty
    if (tagValue) {

        
        const tagElement = document.createElement('span');
        tagElement.className = 'uploaded-tag'; // Optional: for styling purposes
        tagElement.textContent = tagValue;

         // Store the tag value in a data attribute for easy retrieval
        tagElement.setAttribute('data-tag', tagValue);

        // Add a way to remove the tag 
        const removeButton = document.createElement('button');
        removeButton.className = "remove-button"
        removeButton.textContent = 'x';
        removeButton.onclick = function() {
            tagElement.remove();
        };
        tagElement.appendChild(removeButton);

    
        const tagList = document.getElementById('tag-upload-list');
        tagList.appendChild(tagElement);

        // Clear the input field for the next tag
        document.getElementById('content-share-note-tag').value = '';
    }
}

