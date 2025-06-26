const data = [
    {
        img: '../img/jpg/Rectangle 4.jpg',
        title: 'Project Tile goes here',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content',
        technology: [
            {
                title: 'HTML',
                id: 'html'
            },
            {
                title: 'JavaScript',
                id: 'java-script'
            },
            {
                title: 'SASS',
                id: 'sass'
            },
            {
                title: 'React',
                id: 'react'
            },
        ],
        theme: [
            {
                title: 'Landing',
                id: 'landing'
            },
        ],
        platform: [
            {
                title: 'Web',
                id: 'web'
            }
        ],
    },
    {
        img: '../img/jpg/Rectangle 4.jpg',
        title: 'Project Tile goes here',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content',
        technology: [
            {
                title: 'HTML',
                id: 'html'
            },

            {
                title: 'React',
                id: 'react'
            },
        ],
        theme: [
            {
                title: 'Ecommerce',
                id: 'ecommerce'
            },
        ],
        platform: [
            {
                title: 'Ios',
                id: 'ios'
            }
        ],
    },
    {
        img: '../img/jpg/Rectangle 4.jpg',
        title: 'Project Tile goes here',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content',
        technology: [
            {
                title: 'HTML',
                id: 'html'
            },
            {
                title: 'JavaScript',
                id: 'java-script'
            },
            {
                title: 'SASS',
                id: 'sass'
            },
            {
                title: 'React',
                id: 'react'
            },
        ],
        theme: [
            {
                title: 'Blog',
                id: 'blog'
            },
        ],
        platform: [

            {
                title: 'Android',
                id: 'android'
            }
        ],
    },
    {
        img: '../img/jpg/Rectangle 4.jpg',
        title: 'Project Tile goes here',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content',
        technology: [
            {
                title: 'HTML',
                id: 'html'
            },
        ],
        theme: [
            {
                title: 'Landing',
                id: 'landing'
            },
        ],
        platform: [
            {
                title: 'Web',
                id: 'web'
            }
        ],
    }
];

const projectsContainer = document.querySelector('.js-projects-container');
const filtersForm = document.querySelector('.js-filters');
const viewToggleBtn = document.querySelector('.btn-cv');
const activeFilters = {};
let isListView = false;

const createProjectTemplate = (project) => {
    if (isListView) {
        return `
        <article class="project-card project-card--list">
            <img class="img" src="${project.img}" alt="">
            <div class="content">
                <h3 class="name">${project.title}</h3>
                <p class="desc">${project.desc}</p>
                <p class="stack"><b>Tech stack</b>: ${project.technology.map(item => item.title).join(', ')}</p>
                <p class="stack"><b>Platform</b>: ${project.platform.map(item => item.title).join(', ')}</p>
                <p class="stack"><b>Theme</b>: ${project.theme.map(item => item.title).join(', ')}</p>
                <div class="actions">
                    <a href="" class="link">
                        <img class="icon" src="../img/svg/akar-icons_link-chain.svg" alt="">
                        Live Preview
                    </a>
                    <a href="" class="link">
                        <img class="icon" src="../img/svg/akar-icons_github-fill.svg" alt="">
                        View Code
                    </a>
                </div>
            </div>
        </article>
        `;
    } else {
        return `
        <article class="project-card">
            <img class="img" src="${project.img}" alt="">
            <div class="content">
                <h3 class="name">${project.title}</h3>
                <p class="desc">${project.desc}</p>
                <p class="stack"><b>Tech stack</b>: ${project.technology.map(item => item.title).join(', ')}</p>
                <p class="stack"><b>Platform</b>: ${project.platform.map(item => item.title).join(', ')}</p>
                <p class="stack"><b>Theme</b>: ${project.theme.map(item => item.title).join(', ')}</p>
                <div class="actions">
                    <a href="" class="link">
                        <img class="icon" src="../img/svg/akar-icons_link-chain.svg" alt="">
                        Live Preview
                    </a>
                    <a href="" class="link">
                        <img class="icon" src="../img/svg/akar-icons_github-fill.svg" alt="">
                        View Code
                    </a>
                </div>
            </div>
        </article>
        `;
    }
};

const dataRender = (data, container) => {
    if (!(typeof data === 'object')) {
        return '';
    }

    if (data.length === 0) {
        container.innerHTML = '<div class="no-results">There are no items that satisfy the filter</div>';
        container.classList.remove('inner--list');
        return;
    }

    let content = '';
    for (let i = 0; i < data.length; i++) {
        content += createProjectTemplate(data[i]);
    }

    container.innerHTML = content;

    if (isListView) {
        container.classList.add('inner--list');
    } else {
        container.classList.remove('inner--list');
    }
};

const itemIsValid = (dataItem, activeFilters) => {
    let count = 0;
    for (const activeFilterKey in activeFilters) {
        const activeFilterValue = activeFilters[activeFilterKey];
        const itemHasFilterValue = dataItem[activeFilterKey].map(item =>
            item.id).includes(activeFilterValue);
        if (itemHasFilterValue) {
            count++;
        }
    }
    return Object.keys(activeFilters).length === count;
};

const handleFormChange = (event) => {
    const target = event.target;
    const targetValue = target.value;
    const targetName = target.name;

    if (targetValue === '') {
        delete activeFilters[targetName];
        if (!Object.keys(activeFilters).length) {
            dataRender(data, projectsContainer);
            return;
        }
    } else {
        activeFilters[targetName] = targetValue;
    }

    const filteredData = data.filter((dataItem) => itemIsValid(dataItem, activeFilters));
    dataRender(filteredData, projectsContainer);
};

const handleViewToggle = () => {
    isListView = !isListView;

    const filteredData = Object.keys(activeFilters).length === 0
        ? data
        : data.filter((dataItem) => itemIsValid(dataItem, activeFilters));

    dataRender(filteredData, projectsContainer);
};

filtersForm.addEventListener('change', handleFormChange);
viewToggleBtn.addEventListener('click', handleViewToggle);

dataRender(data, projectsContainer);