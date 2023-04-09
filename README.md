# blockchain-expense-managment
Welcome frens~

This project was born out of a TreeHacks project here: [https://devpost.com/software/aegis-finance](https://devpost.com/software/aegis-finance) (Derrick, Bradley, Emily, Joshua)

After membership into Blockchain at Berkeley, Derrick decided to build out the TreeHacks project in full under a new name, Expense Management with team members:

🧑‍💼 **********************Business:********************** Aryan Bhadouria

👨🏼‍🎨 **Designer:** Rishi Thakar

👨🏼‍💻 **Developers:** Derrick Cui, Trevor Trinh, Hiya Shah

🤴**Advisor:** Harry Yuan

**Purpose:**

Expense Management

Parties involved: user and company

Scenario: User pays for something (Uber ride, dinner, subscription, etc) and wants to get expensed by the company

Problem: expense management usually involves google forms, a lot of back-and-forth, and months on end of opaque waiting when you never know where your money is

Solution: company wants a way to credit user now, pay later, doing so transparently on-chain

**Process:**

User connects bank account using Plaid, picks which transactions they want to be expensed for on our dashboard frontend

Company goes onto dashboard frontend to verify that the transactions are allowed to be expensed, clicks “send transaction”

Behind the scenes, it calls a contract which mints EXP tokens (our new token) and sends it to the user’s wallet address

Company, when they have the money, puts USDC into the contract

Whenever this happens, user can exchange their EXP tokens 1:1 for USDC

Voila! Simplified expense management process