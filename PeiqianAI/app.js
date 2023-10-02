const apiEndpoint = 'https://80j89787n8.goho.co/';
const messagesContainer = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');
const messageForm = document.querySelector('#message-form');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageText = messageInput.value.trim();
  if (!messageText) return;

  const userMessage = createMessage('user-message', messageText);
  messagesContainer.appendChild(userMessage);

  sendMessageToChatbot(messageText)
    .then((response) => {
      const chatbotMessage = createMessage('chatbot-message', response);
      messagesContainer.appendChild(chatbotMessage);
    })
    .catch((error) => {
      console.error(error);
    });

  messageInput.value = '';
});

function sendMessageToChatbot(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `${apiEndpoint}?text=${encodedMessage}`;

  return fetch(url)
    .then((response) => response.text());
}

function createMessage(className, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', className);
  const messageText = document.createTextNode(text);
  messageDiv.appendChild(messageText);
  return messageDiv;
}
