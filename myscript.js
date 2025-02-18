fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                const todosByUserId = {};

                // Group todos by userId
                data.forEach(todo => {
                    if (!todosByUserId[todo.userId]) {
                        todosByUserId[todo.userId] = [];
                    }
                    todosByUserId[todo.userId].push(todo);
                });

                // Create accordion elements
                const accordionContainer = document.getElementById('accordion-container');
                for (const userId in todosByUserId) {
                    const accordion = document.createElement('div');
                    accordion.classList.add('accordion');

                    const header = document.createElement('button');
                    header.classList.add('accordion-header');
                    header.innerHTML = `User  ID: ${userId}`;

                    const accordionIcon = document.createElement('span');
                    accordionIcon.classList.add('accordion-icon');
                    accordionIcon.innerHTML = `V`;
                    header.appendChild(accordionIcon);
                    header.addEventListener('click', () => {
                        header.classList.toggle('active');
                        const content = header.nextElementSibling;


                        accordionIcon.style.rotate = header.classList.contains('active') ? '180deg' : '0deg';
                        
                        // Toggle display between 'none' and 'flex'
                        if (content.style.display === 'flex') {
                            content.style.display = 'none';
                        } else {
                            content.style.display = 'flex'; // Set to flex when showing
                        }
                    });
                    accordion.appendChild(header);

                    const content = document.createElement('div');
                    content.classList.add('accordion-content');
                    todosByUserId[userId].forEach(todo => {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.innerHTML = `
                    <p><strong>Title:</strong> ${todo.title}</p>
                    <p><strong>Completed:</strong> 
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
                    </p>
                `;
                        content.appendChild(card);
                    });
                    accordion.appendChild(content);

                    accordionContainer.appendChild(accordion);
                }
            });