let welcomeScreen = document.querySelector('.first-scr')
let appContainer = document.querySelector('.app-container')
let mainScreen = document.querySelector('.main-scr')
let settingsScreen = document.querySelector('.settings')
let calendarScreen = document.querySelector('.calendar-scr')
let assignmentsScreen = document.querySelector('.assignments-scr')

let currentDate = new Date()
let currentYear = currentDate.getFullYear()
let currentDay = currentDate.getDate()
let currentMonth = currentDate.getMonth()

let months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

let tasks = [

]

let loginButton = document.getElementById('login-btn')
let menuItems = document.querySelectorAll('.sidebar a')
let joinClassButton = document.querySelector('.join-class')
let createClassButton = document.querySelector('.create-class')
let classGrid = document.getElementById('classGrid')
let joinClassModal = document.getElementById('joinClassModal')
let createClassModal = document.getElementById('createClassModal')
let joinClassForm = document.getElementById('joinClassForm')
let createClassForm = document.getElementById('createClassForm')
let themeDropdown = document.getElementById('theme-select')
let languageDropdown = document.getElementById('lang-select')
let notificationsCheckbox = document.getElementById('notifications-toggle')
let saveButton = document.querySelector('.save-btn')

let classes = []
if (localStorage.getItem('classes')) {
    classes = JSON.parse(localStorage.getItem('classes'))
}

function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen')
    welcomeScreen.style.display = 'none'
    
    for (let i = 0; i < screens.length; i++) {
        screens[i].style.display = 'none'
    }
    if (screenName === 'settings') {
        const settingsScreen = document.getElementById('settings')
        if (settingsScreen) {
            settingsScreen.style.display = 'block'
        }
    } else {
        const activeScreen = document.querySelector(`.${screenName}-scr`)
        if (activeScreen) {
            activeScreen.style.display = 'block'
        }
    }

    const sidebarLinks = document.querySelectorAll('.sidebar a')
    for (let i = 0; i < sidebarLinks.length; i++) {
        sidebarLinks[i].classList.remove('active')
    }

    const activeLink = document.querySelector(`.sidebar a[href="#${screenName}"]`)
    if (activeLink) {
        activeLink.classList.add('active')
    }
}
    

function makeClassCode() {
    let code = ''
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 6; i++) {
        code += letters[Math.floor(Math.random() * letters.length)]
    }
    return code
}

function showClasses() {
    const classGrid = document.getElementById('classGrid')
    const noClassesMessage = document.getElementById('noClassesMessage')
    classGrid.innerHTML = ''

    if (classes.length === 0) {
        noClassesMessage.style.display = 'block'
        return
    }

    noClassesMessage.style.display = 'none'
    for (let i = 0; i < classes.length; i++) {
        const classCard = document.createElement('div')
        classCard.className = 'class-card'

        const className = document.createElement('h3')
        className.textContent = classes[i].name

        const classSubject = document.createElement('p')
        classSubject.textContent = `Предмет: ${classes[i].subject}`

        const classCode = document.createElement('p')
        classCode.textContent = `Код класу: ${classes[i].code}`
        
        classCard.appendChild(className)
        classCard.appendChild(classSubject)
        classCard.appendChild(classCode)
        classGrid.appendChild(classCard)
    }
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active')
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active')
}

loginButton.addEventListener('click', function() {
    welcomeScreen.style.display = 'none'
    appContainer.style.display = 'flex'
    showScreen('main')  
})

let sidebarLinks = document.querySelectorAll('.sidebar a')
for (let i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener('click', function (e) {
        e.preventDefault()
        let screen = this.getAttribute('href').replace('#', '')
        showScreen(screen)
    });
}            



document.querySelector('#joinClassModal .cancel-btn').addEventListener('click', function() {
    hideModal('joinClassModal')
})

document.querySelector('#createClassModal .cancel-btn').addEventListener('click', function() {
    hideModal('createClassModal')
})

joinClassButton.addEventListener('click', function() {
    showModal('joinClassModal')
})

createClassButton.addEventListener('click', function() {
    showModal('createClassModal')
})

joinClassForm.addEventListener('submit', function(event) {
    event.preventDefault()
    
    let code = document.getElementById('classCode').value
    code = code.toUpperCase()
    
    let found = false
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].code === code) {
            found = true
            alert('Ви успішно приєднались до класу: ' + classes[i].name)
            hideModal('joinClassModal')
            joinClassForm.reset()
            break
        }
    }
    
    if (!found) {
        alert('Клас з таким кодом не знайдено')
    }
})

createClassForm.addEventListener('submit', function(event) {
    event.preventDefault()
    
    let className = document.getElementById('className').value
    let classSubject = document.getElementById('classSubject').value
    
    let newClass = {
        name: className,
        subject: classSubject,
        code: makeClassCode(),
        createdAt: new Date().toISOString()
    }
    
    classes.push(newClass)
    localStorage.setItem('classes', JSON.stringify(classes))
    
    hideModal('createClassModal')
    createClassForm.reset()
    showClasses()
    
    alert('Клас створено! Код класу: ' + newClass.code)
})

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function(event) {
        event.preventDefault()
        
        let link = this.getAttribute('href')
        
        for (let j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('active')
        }
        
        this.classList.add('active')
        
        if (link == '#') {
            showScreen('main')
        } else if (link == '#settings') {
            showScreen('settings')
        } else if (link == '#calendar') {
            showScreen('calendar')
        } else if (link == '#assignments') {
            showScreen('assignments')
        }
    })
}

themeDropdown.value = localStorage.getItem('theme') || 'light'
languageDropdown.value = localStorage.getItem('lang') || 'uk'
notificationsCheckbox.checked = localStorage.getItem('notifications') === 'true' || false

function changeTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme')
        document.body.classList.remove('light-theme')
    } else {
        document.body.classList.add('light-theme')
        document.body.classList.remove('dark-theme')
    }
}

themeDropdown.addEventListener('change', function () {
    changeTheme(this.value);
    localStorage.setItem('theme', this.value);
})

changeTheme(themeDropdown.value)

saveButton.addEventListener('click', function(event) {
    event.preventDefault()
    
    localStorage.setItem('theme', themeDropdown.value)
    localStorage.setItem('lang', languageDropdown.value)
    localStorage.setItem('notifications', notificationsCheckbox.checked)
    
    alert('Налаштування збережено')
})

function showAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal')
    modal.classList.add('active')
}

function hideAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal')
    modal.classList.remove('active')
}

document.querySelector('.add-assignment').addEventListener('click', showAddAssignmentModal)

document.querySelector('#addAssignmentModal .cancel-btn').addEventListener('click', hideAddAssignmentModal)

document.getElementById('createClassForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const className = document.getElementById('className').value
    const classSubject = document.getElementById('classSubject').value

    const existingClass = classes.find(c => c.name === className)
    if (existingClass) {
        existingClass.subject = classSubject
    } else {
        const newClass = {
            name: className,
            subject: classSubject,
            code: makeClassCode(),
        };
        classes.push(newClass)
    }

    localStorage.setItem('classes', JSON.stringify(classes))
    showClasses()
    hideModal('createClassModal')
})

function showCalendar() {
    let months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    
    let month = currentDate.getMonth()
    let year = currentDate.getFullYear()
    
    document.getElementById('currentMonth').textContent = months[month] + ' ' + year
    
    let firstDay = new Date(year, month, 1)
    let lastDay = new Date(year, month + 1, 0)
    
    let calendarDays = document.getElementById('calendarDays')
        
        dayDiv += '>' + day + '</div>'
        calendarDays.innerHTML += dayDiv
        function renderCalendar() {
            const fragment = document.createDocumentFragment()
            const today = new Date()

        
            for (let day = 1; day <= lastDay.getDate(); day++) {
                let dayDiv = document.createElement('div')
                dayDiv.textContent = day
                fragment.appendChild(dayDiv)
            }     
            calendarDays.innerHTML = ''
            calendarDays.appendChild(fragment)
        }
    }


function showAssignments() {

    let list = document.getElementById('assignmentsList')
    let selectedClass = document.getElementById('classFilter').value
    let selectedStatus = document.getElementById('statusFilter').value
    

    list.innerHTML = ''
    

    for (let i = 0; i < assignments.length; i++) {
        let task = assignments[i]

        if (selectedClass != 'all') {
            if (task.class != selectedClass) {
                continue 
            }
        }

        if (selectedStatus != 'all') {
            if (task.status != selectedStatus) {
                continue 
            }
        }
        

        let card = ''
        card = card + '<div class="assignment-card">'
        card = card + '<h3>' + task.title + '</h3>'
        card = card + '<p class="class-name">' + task.class + '</p>'
        

        let dueDate = new Date(task.dueDate)
        let dateString = dueDate.toLocaleDateString()
        card = card + '<p class="due-date">Дедлайн: ' + dateString + '</p>'
        

        if (task.description != '') {
            card = card + '<p class="description">' + task.description + '</p>'
        }

        let statusText = ''
        if (task.status == 'pending') {
            statusText = 'Очікує'
        } else {
            statusText = 'Виконано'
        }
        card = card + '<div class="status ' + task.status + '">' + statusText + '</div>'
        card = card + '</div>'

        list.innerHTML = list.innerHTML + card
    }
}

function addClickListener(selector, callback) {
    document.querySelector(selector).addEventListener('click', callback)
}

addClickListener('.prev-month', function() {
    currentDate.setMonth(currentDate.getMonth() - 1)
    showCalendar()
})

addClickListener('.next-month', function() {
    currentDate.setMonth(currentDate.getMonth() + 1)
    showCalendar()
})

addClickListener('.add-assignment', function() {
    showModal('addAssignmentModal')
})


document.addEventListener('DOMContentLoaded', function() {
    updateMonth()

    let today = new Date().getDate()
    showDayTasks(today)
    

    for (let i = 0; i < tasks.length; i++) {
        let dayCell = document.querySelector('.calendar-table td:nth-child(' + (tasks[i][0] % 7 || 7) + ')')
        if (dayCell) {
            dayCell.classList.add('has-task')
        }
    }
})

function updateMonth() {
    document.getElementById('currentMonth').textContent = months[currentMonth]
}

function showAddTaskForm() {
    document.getElementById('addTaskModal').style.display = 'flex'
    document.getElementById('taskDay').value = selectedDay || new Date().getDate()
}

function hideAddTaskForm() {
    document.getElementById('addTaskModal').style.display = 'none'
    document.getElementById('taskDay').value = ''
    document.getElementById('taskTitle').value = ''
    document.getElementById('taskClass').value = ''
}

function showDayTasks(day) {
    let allDays = document.querySelectorAll('.calendar-table td')
    for (let i = 0; i < allDays.length; i++) {
        allDays[i].classList.remove('selected-day')
    }

    let clickedDay = document.querySelector(`.calendar-table td:nth-child(${(day % 7) || 7})`)
    if (clickedDay) {
        clickedDay.classList.add('selected-day')
    }

     
    let TasksList = document.getElementById('tasksList')
    tasksList.innerHTML = ''

    let dayTasks = tasks.filter(task => task[0] === day)
    if (dayTasks.length === 0) {
        tasksList.innerHTML = '<p>Немає завдань на цей день</p>'
        return
    }

    for (let i = 0; i < dayTasks.length; i++) {
        const task = dayTasks[i]
        const taskElement = document.createElement('div')
        taskElement.className = 'task-item'
        taskElement.innerHTML = `
            <h4>${task[1]}</h4>
            <p>Клас: ${task[2]}</p>
        `
        tasksList.appendChild(taskElement)
    }
}

function prevMonth() {
    currentMonth = currentMonth - 1
    if (currentMonth < 0) {
        currentMonth = 11
    }
    updateMonth()
}

function nextMonth() {
    currentMonth = currentMonth + 1
    if (currentMonth > 11) {
        currentMonth = 0
    }
    updateMonth()
}

function addTask() {
    let day = document.getElementById('taskDay').value
    let title = document.getElementById('taskTitle').value
    let className = document.getElementById('taskClass').value
    
    if (day && title && className && day > 0 && day <= new Date(currentYear, currentMonth + 1, 0).getDate()) {
        tasks.push([parseInt(day), title, className])
        showDayTasks(parseInt(day))
        hideAddTaskForm()
    } else {
        alert('Введіть коректний день, назву та клас.')
    }
        
    
        for (let i = 0; i < tasks.length; i++) {
            let dayCell = document.querySelector('.calendar-table td:nth-child(' + (tasks[i][0] % 7 || 7) + ')')
            if (dayCell) {
                dayCell.classList.add('has-task')
            }
        }
}


document.addEventListener('DOMContentLoaded', function() {
    updateMonth()
    
    let today = new Date().getDate()
    showDayTasks(today)
    
    for (let i = 0; i < tasks.length; i++) {
        let dayCell = document.querySelector('.calendar-table td:nth-child(' + (tasks[i][0] % 7 || 7) + ')')
        if (dayCell) {
            dayCell.classList.add('has-task')
        }
    }
})

function resetSettings() {
    document.getElementById('theme-select').value = 'light'
    document.getElementById('language-select').value = 'uk'
    document.getElementById('notifications').checked = false
    document.body.classList.remove('dark-theme')
    
    localStorage.removeItem('theme')
    localStorage.removeItem('language')
    localStorage.removeItem('notifications')
}

function saveSettings() {
    let theme = document.getElementById('theme-select').value
    let language = document.getElementById('language-select').value
    let notifications = document.getElementById('notifications').checked
    
    localStorage.setItem('theme', theme)
    localStorage.setItem('language', language)
    localStorage.setItem('notifications', notifications)
    
    document.body.classList.toggle('dark-theme', theme === 'dark')
    
    alert('Налаштування збережено')
}

function safeLocalStorageSetItem(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch (e) {
        console.error('Failed to save to localStorage:', e)
    }
}

function safeLocalStorageGetItem(key, defaultValue) {
    try {
        return localStorage.getItem(key) || defaultValue
    } catch (e) {
        console.error('Failed to read from localStorage:', e)
        return defaultValue
    }
}

function editClass(classCode) {
    const classToEdit = classes.find(c => c.code == classCode)
    if (classToEdit) {
        document.getElementById('className').value = classToEdit.name
        document.getElementById('classSubject').value = classToEdit.subject
        showModal('createClassModal')
    }
}

function deleteClass(classCode) {
    const confirmDelete = confirm('Ви впевнені, що хочете видалити цей клас?')
    if (confirmDelete) {
        classes = classes.filter(c => c.code !== classCode)
        localStorage.setItem('classes', JSON.stringify(classes))
        showClasses()
    }
}

let savedTheme = localStorage.getItem('theme') || 'light'
let savedLanguage = localStorage.getItem('language') || 'uk'
let savedNotifications = localStorage.getItem('notifications') === 'true'

document.getElementById('theme-select').value = savedTheme
document.getElementById('language-select').value = savedLanguage
document.getElementById('notifications').checked = savedNotifications
document.body.classList.toggle('dark-theme', savedTheme === 'dark')

window.onclick = function(event) {
    let modal = document.getElementById('addTaskModal')
    if (event.target == modal) {
        hideAddTaskForm()
    }
}

document.addEventListener('DOMContentLoaded', showClasses)
showScreen('start')
