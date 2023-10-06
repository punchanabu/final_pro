import { fetchNotes } from "../api.js";
import { renderNote } from "./note.js";
import { fetchTags } from "../api.js";
export const notelist = () => {

    // render note list element
    render();
    
    // Attach JavaScript event listener to the input element
    var script = document.createElement('script');
    script.src = '../script/render/note.js';
    script.type = 'module';
    script.onload = async function() {
        load();
    };
    document.head.appendChild(script);
}

const render = () => {
    document.getElementById('app').innerHTML = 
    `
    <div style="display: flex; justify-content: flex-end;">
        <div><input id="search" class="search-input" placeholder="ค้นหาสมุดโน็ต" />
        </div>
    </div>
    <div style="display: flex; justify-content: flex-end;">
        <div class="drop-down-tag">
            <div id="selected-option">เลือกจาก tag</div>
            <div id="tag-search"></div>
        </div>
    </div>

    <div class="container01">
        <button id = "newest-button">ใหม่ที่สุด</button>
        <button id = "max-view-button">ดูมากที่สุด</button>
    </div>
    <section id = "note-list"></section>
    
    `;  
}

const load = async () => {
    
    // load data
    const data = await fetchNotes();
    renderNote(data);
    
    // load tag
    const tagData = await fetchTags();
    // handle button
    handleButton();
    // Get the select element
    const selectElement = document.getElementById('tag-search');
    const selectedOption = document.getElementById('selected-option');
    // populate the select element with options
    tagData.forEach(tag => {
        const option = document.createElement('div');
        option.className = "option";
        option.setAttribute('data-value',tag);
        option.textContent = tag;
        selectElement.appendChild(option);
    })
    selectElement.addEventListener('click', event => {
        if (event.target.matches('.option')) {
            const selectedOption = document.getElementById('selected-option')
            const selectValue = event.target.textContent;
            selectedOption.textContent = selectValue;
            selectElement.style.display = 'none';

            renderNote(data, selectValue, "tag");
        }
    })
    selectedOption.addEventListener('click', () => {
        selectElement.style.display = selectElement.style.display === 'block' ? 'none' : 'block';
    });
    selectedOption.addEventListener('click', () => {
        if (selectElement.classList.contains('open')) {
            selectElement.classList.remove('open');
        }
        else selectElement.classList.add('open');
    })
    // reload every search input to implemented a real-time search
    document.getElementById('search').addEventListener('input' ,(event) => {
        renderNote(data, event.target.value);
    })
};

const handleButton = () => {
    const newest = document.getElementById('newest-button');
    const max = document.getElementById('max-view-button');

    newest.addEventListener('click', async () => {
        const data = await fetchNotes();
        const sortedByDate = data.sort((a, b) => new Date(b.createdDatetime) - new Date(a.createdDatetime));
        renderNote(sortedByDate);
    });
    max.addEventListener('click', async () => {
        const data = await fetchNotes();

        // Sort by views
        const sortedByViews = data.sort((a, b) => b.view - a.view);

        renderNote(sortedByViews);
    });
}