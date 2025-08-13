# 🗂 Page Replacement Algorithms Simulator

## 📌 Overview
Page Replacement is a process used by the **Operating System (OS)** to decide **which memory page should be replaced** when a new page needs to be loaded into RAM but no free space is available.

This project demonstrates and simulates various **Page Replacement Algorithms** with easy-to-understand examples, statistics, and visual outputs.

---

## 📖 What is Page Replacement?
When a program executes, its pages are loaded into **main memory** (RAM). If the memory is full and a new page is needed, the **OS** must choose which existing page to remove to make space for the new one.  
This decision is made using **Page Replacement Algorithms** to reduce **page faults** and optimize performance.

---

## 🧠 Implemented Algorithms

### 1️⃣ FIFO (First-In-First-Out)
- **Idea:** Replace the page that has been in memory the longest (oldest loaded).
- **Example:** If pages `1 2 3 4` are loaded in that order and a new page arrives, `1` will be replaced first.
- **Pros:** Simple to implement.
- **Cons:** Can lead to **Belady’s Anomaly** (more frames → more faults).

---

### 2️⃣ LRU (Least Recently Used)
- **Idea:** Replace the page that has **not been used for the longest time**.
- **Example:** If `2` was last used 10 steps ago while others were used more recently, `2` will be replaced.
- **Pros:** Good approximation of optimal behavior.
- **Cons:** Needs tracking of page usage (higher overhead).

---

### 3️⃣ Optimal (OPT)
- **Idea:** Replace the page that will **not be used for the longest time in the future**.
- **Example:** If `4` will not be needed for the next 20 steps, but others are needed sooner, replace `4`.
- **Pros:** Produces the minimum number of page faults.
- **Cons:** Not possible in real-time systems (future knowledge required).

---

### 4️⃣ LIFO (Last-In-First-Out)
- **Idea:** Remove the most **recently loaded** page.
- **Example:** If the last page loaded is `5`, it will be removed first.
- **Pros:** Easy to implement.
- **Cons:** Not efficient in most real-world workloads.

---

## 📊 Key Terms

| Term          | Meaning |
|---------------|---------|
| **Page Fault** | Occurs when a requested page is not in memory and must be loaded from disk. |
| **Page Hit**   | Occurs when the requested page is already in memory. |
| **Frame**      | A fixed-size slot in RAM that holds a single page. |
| **Reference String** | The sequence of page requests from a process. |

---

## 🚀 Features
- Simulates **FIFO, LRU, OPTIMAL, and LIFO** algorithms.
- Displays:
  - Number of **Page Hits** and **Page Faults**
  - **Hit Ratio** and **Fault Ratio**
  - Step-by-step replacement process.
- **Visualization** of memory frame states.
- Future scope: Database integration for saving results & analytics.

---

## 🛠 How to Run
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/page-replacement-simulator.git

📦 Page-Replacement-Algorithms-Simulator
 ┣ 📜 index.html       # Main simulator page
 ┣ 📜 style.css        # Styles for visualization
 ┣ 📜 fifo.js          # FIFO Algorithm
 ┣ 📜 lru.js           # LRU Algorithm
 ┣ 📜 optimal.js       # Optimal Algorithm
 ┣ 📜 lifo.js          # LIFO Algorithm
 ┣ 📜 db_connect.php   # (Optional) Database connection
 ┗ 📜 README.md        # Project Documentation


📅 Last Updated
August 5, 2025

🖋 Author
Nowrin 
