# EV Charging Station Simulation

---

## Requirements and Conditions

1. **Technology Stack**:
    - The project is implemented in **JavaScript** (TypeScript + Node.js).

2. **Dependency Installation**:
    - Ensure you have [nvm](https://github.com/nvm-sh/nvm) installed.
    - Install project dependencies:
      ```bash
      npm install
      ```

3. **Running the Project**:
    - Start the simulation:
      ```bash
      npm run start
      ```

---

## Explanation

1. **Maximum Power Demand**:
    - The maximum power depends directly on the number of EVs charging simultaneously.
    - With the provided probabilities for EV arrivals and charging needs, it is **impossible to reach the expected power demand range (77-121 kW)** or the concurrency factor (35-55%).

2. **Daylight Saving Time (DST)**:
    - To account for DST, the probabilities of EV arrivals would need to shift accordingly.
    - However, the current dataset does not include these adjusted probabilities, making it impossible to accurately simulate DST transitions.

---

## Results

### Table of Results

| Number of stations | Total energy | Theoretical max power | Max power | Concurrency factor |
| :----------------- | :----------- | :-------------------- | :-------- | :----------------- |
| 1                  | 10906.5      | 11                    | 11        | 100                |
| 2                  | 11561        | 22                    | 22        | 100                |
| 3                  | 11756.25     | 33                    | 33        | 100                |
| 4                  | 11651.75     | 44                    | 33        | 75                 |
| 5                  | 11822.25     | 55                    | 33        | 60                 |
| 6                  | 13213.75     | 66                    | 44        | 66.7               |
| 7                  | 11720.5      | 77                    | 33        | 42.9               |
| 8                  | 12201.75     | 88                    | 33        | 37.5               |
| 9                  | 11539        | 99                    | 33        | 33.3               |
| 10                 | 11783.75     | 110                   | 33        | 30                 |
| 11                 | 11715        | 121                   | 44        | 36.4               |
| 12                 | 11239.25     | 132                   | 44        | 33.3               |
| 13                 | 11959.75     | 143                   | 33        | 23.1               |
| 14                 | 12056        | 154                   | 33        | 21.4               |
| 15                 | 11657.25     | 165                   | 44        | 26.7               |
| 16                 | 12111        | 176                   | 44        | 25                 |
| 17                 | 12559.25     | 187                   | 44        | 23.5               |
| 18                 | 12793        | 198                   | 44        | 22.2               |
| 19                 | 11475.75     | 209                   | 44        | 21.1               |
| 20                 | 11514.25     | 220                   | 44        | 20                 |
| 21                 | 12435.5      | 231                   | 33        | 14.3               |
| 22                 | 11481.25     | 242                   | 33        | 13.6               |
| 23                 | 11995.5      | 253                   | 33        | 13                 |
| 24                 | 11968        | 264                   | 44        | 16.7               |
| 25                 | 12122        | 275                   | 33        | 12                 |
| 26                 | 12190.75     | 286                   | 33        | 11.5               |
| 27                 | 12581.25     | 297                   | 33        | 11.1               |
| 28                 | 12025.75     | 308                   | 33        | 10.7               |
| 29                 | 12361.25     | 319                   | 33        | 10.3               |
| 30                 | 12595        | 330                   | 33        | 10                 |

---

### Chart (Concurrency factor / Number of stations from 1 to 30)

```bash
100.00 ┼──╮                           
 97.00 ┤  │                           
 94.00 ┤  │                           
 91.00 ┤  │                           
 88.00 ┤  │                           
 85.00 ┤  │                           
 82.00 ┤  │                           
 79.00 ┤  │                           
 76.00 ┤  ╰╮                          
 73.00 ┤   │                          
 70.00 ┤   │                          
 67.00 ┤   │╭╮                        
 64.00 ┤   │││                        
 61.00 ┤   ╰╯│                        
 58.00 ┤     │                        
 55.00 ┤     │                        
 52.00 ┤     │                        
 49.00 ┤     │                        
 46.00 ┤     │                        
 43.00 ┤     ╰╮                       
 40.00 ┤      ╰╮                      
 37.00 ┤       │ ╭╮                   
 34.00 ┤       ╰╮│╰╮                  
 31.00 ┤        ╰╯ │                  
 28.00 ┤           │ ╭╮               
 25.00 ┤           ╰╮│╰─╮             
 22.00 ┤            ╰╯  ╰──╮          
 19.00 ┤                   │  ╭╮      
 16.00 ┤                   ╰─╮││      
 13.00 ┤                     ╰╯╰───╮  
 10.00 ┤                           ╰─ 
```
