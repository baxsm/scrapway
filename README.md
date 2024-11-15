# 🚀 Scrapway: Web Scraping Workflow Builder & Runner

**Scrapway** allows users to create powerful data scraping workflows and execute them either manually or via cron jobs. With an intuitive UI and support for various tasks such as user interactions, data extraction, storage, and result delivery – you can easily automate scraping operations with minimal effort.

## Features ✨

- **Workflow Builder**: Use React Flow to create and design scraping tasks visually.
- **User Interactions**: Automate tasks like navigating to URLs, filling inputs, clicking elements, and scrolling to specific elements.
- **Data Extraction**: Extract raw HTML, specific text, or use AI-based extraction techniques.
- **Data Storage**: Read and write properties from JSON files, or store your scraping results conveniently.
- **Timing Controls**: Add flexibility by waiting for elements before proceeding with actions.
- **Result Delivery**: Deliver scraping results via Webhook.
- **Scheduling**: Set up cron jobs to automate running workflows at specific intervals.

---

## Task List 📝

Here is an overview of the tasks available to be added and run within the workflow:

### User Interactions 🖱️

- `NAVIGATE_URL`: Navigate to a specific URL.
- `FILL_INPUT`: Fill an input field.
- `CLICK_ELEMENT`: Simulate a click event on an element.
- `SCROLL_TO_ELEMENT`: Scroll to a particular element on the page.

### Data Extraction 🛠️

- `PAGE_TO_HTML`: Extract the entire page as HTML.
- `EXTRACT_TEXT_FROM_ELEMENT`: Extract text from a specific element.
- `EXTRACT_WITH_AI`: Use AI to extract and analyze content from the page.

### Data Storage 🗃️

- `READ_PROPERTY_FROM_JSON`: Read data from a JSON file.
- `ADD_PROPERTY_TO_JSON`: Add or update properties in a JSON file.

### Timing Controls ⏳

- `WAIT_FOR_ELEMENT`: Wait for an element to appear before proceeding to the next task.

### Results Delivery 📬

- `DELIVER_VIA_WEBHOOK`: Send the results to a Webhook URL.

---

## Getting Started 🔧

### Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/baxsm/scrapway.git
cd scrapway
npm install --legacy-peer-deps
```

### Running the Project

To start the project locally:

```bash
npm run dev
```

Visit `http://localhost:3000` to start building workflows!

### Building for Production

To create a production build:

```bash
npm run build
```

---

## How to Use 🚴‍♂️

1. **Open the Workflow Editor**: Use the visual interface based on React Flow to drag and drop tasks into your workflow.
2. **Define Tasks**: Choose tasks from categories like **User Interactions**, **Data Extraction**, etc.
3. **Run or Schedule**: Once the workflow is complete, either run it manually or schedule the execution using a cron job.

---

## Screenshots 🖼️

### Workflow Editor

![Home](/public/home.png)
![Workflows](/public/workflows.png)
![Workflow Editor](/public/workflows-2.png)
![Credentials](/public/credentials.png)
![Billing](/public/billing.png)

---
