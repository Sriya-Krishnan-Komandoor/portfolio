/* From Uiverse.io by guilhermeyohan - DARK THEME VERSION */ 
form {
  background: var(--bg-surface);
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  margin: 50px auto;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
}

label {
  display: block;
  margin-bottom: 8px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: var(--accent-color);
}

.infos[type="text"], 
input[type="email"],
input[type="tel"],
input[type="number"] {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.1);
  background: var(--bg-elevated);
  color: var(--text-main);
  margin-bottom: 5px;
  transition: border-color 0.3s ease;
}

.infos[type="text"]:focus, 
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: var(--accent-color);
}

button {
  background: var(--accent-color);
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 20px;
  transition: all 0.3s ease;
}

button:hover {
  background: #5a8aff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(111, 156, 255, 0.4);
}

button:disabled {
  background: #444;
  cursor: not-allowed;
  transform: none;
}

#limpar {
  background: #dc3545;
  color: white;
}

#limpar:hover {
  background: #c82333;
}

.error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 3px;
  display: block;
  min-height: 20px;
}

.invalid {
  border-color: #ff6b6b !important;
}

.mario {
  width: 5px;
  height: 5px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px 0;
  box-shadow: 0 0 0 transparent, 130px 5px #ffa500, 135px 5px #ffa500,
140px 5px #ffa500, 95px 10px #de4513, 100px 10px #de4513, 105px 10px #de4513,
110px 10px #de4513, 115px 10px #de4513, 130px 10px #ffa500,
135px 10px #ffa500, 140px 10px #ffa500, 90px 15px #de4513, 95px 15px #de4513,
100px 15px #de4513, 105px 15px #de4513, 110px 15px #de4513,
115px 15px #de4513, 120px 15px #de4513, 125px 15px #de4513,
130px 15px hsl(15, 84%, 47%), 135px 15px #ffa500, 140px 15px #ffa500,
90px 20px #a52a2a, 95px 20px #a52a2a, 100px 20px #a52a2a, 105px 20px #ffa500,
110px 20px #ffa500, 115px 20px #000, 120px 20px #ffa500, 130px 20px #4545bb,
135px 20px #4545bb, 140px 20px #4545bb, 85px 25px #a52a2a, 90px 25px #ffa500,
95px 25px #a52a2a, 100px 25px #ffa500, 105px 25px #ffa500,
110px 25px #ffa500, 115px 25px #000, 120px 25px #ffa500, 125px 25px #ffa500,
130px 25px #4545bb, 135px 25px #4545bb, 140px 25px #4545bb,
85px 30px #a52a2a, 90px 30px #ffa500, 95px 30px #a52a2a, 100px 30px #a52a2a,
105px 30px #ffa500, 110px 30px #ffa500, 115px 30px #ffa500,
120px 30px #a52a2a, 125px 30px #ffa500, 130px 30px #ffa500,
135px 30px #ffa500, 140px 30px #4545bb, 85px 35px #a52a2a, 90px 35px #a52a2a,
95px 35px #ffa500, 100px 35px #ffa500, 105px 35px #ffa500,
110px 35px #ffa500, 115px 35px #a52a2a, 120px 35px #a52a2a,
125px 35px #a52a2a, 130px 35px #a52a2a, 135px 35px #a52a2a,
95px 40px #ffa500, 100px 40px #ffa500, 105px 40px #ffa500,
110px 40px #ffa500, 115px 40px #ffa500, 120px 40px #ffa500,
125px 40px #ffa500, 130px 40px #4545bb, 75px 45px #4545bb, 80px 45px #4545bb,
85px 45px #4545bb, 90px 45px #4545bb, 95px 45px #4545bb, 100px 45px #de4513,
105px 45px #4545bb, 110px 45px #4545bb, 115px 45px #4545bb,
120px 45px #de4513, 125px 45px #4545bb, 70px 50px #4545bb, 75px 50px #4545bb,
80px 50px #4545bb, 85px 50px #4545bb, 90px 50px #4545bb, 95px 50px #4545bb,
100px 50px #4545bb, 105px 50px #de4513, 110px 50px #4545bb,
115px 50px #4545bb, 120px 50px #4545bb, 125px 50px #de4513, 140px 50px #000,
65px 55px #ffa500, 70px 55px #ffa500, 75px 55px #4545bb, 80px 55px #4545bb,
85px 55px #4545bb, 90px 55px #4545bb, 95px 55px #4545bb, 100px 55px #4545bb,
105px 55px #de4513, 110px 55px #de4513, 115px 55px #de4513,
120px 55px #de4513, 125px 55px #de4513, 140px 55px #000, 65px 60px #ffa500,
70px 60px #ffa500, 75px 60px #ffa500, 85px 60px #de4513, 90px 60px #de4513,
95px 60px #4545bb, 100px 60px #de4513, 105px 60px #de4513, 110px 60px #ff0,
115px 60px #de4513, 120px 60px #de4513, 125px 60px #ff0, 130px 60px #de4513,
135px 60px #000, 140px 60px #000, 70px 65px #ffa500, 80px 65px #000,
85px 65px #de4513, 90px 65px #de4513, 95px 65px #de4513, 100px 65px #de4513,
105px 65px #de4513, 110px 65px #de4513, 115px 65px #de4513,
120px 65px #de4513, 125px 65px #de4513, 130px 65px #de4513, 135px 65px #000,
140px 65px #000, 75px 70px #000, 80px 70px #000, 85px 70px #000,
90px 70px #de4513, 95px 70px #de4513, 100px 70px #de4513, 105px 70px #de4513,
110px 70px #de4513, 115px 70px #de4513, 120px 70px #de4513,
125px 70px #de4513, 130px 70px #de4513, 135px 70px #000, 140px 70px #000,
70px 75px #000, 75px 75px #000, 80px 75px #000, 85px 75px #de4513,
90px 75px #de4513, 95px 75px #de4513, 100px 75px #de4513, 105px 75px #de4513,
110px 75px #de4513, 115px 75px #de4513, 70px 80px #000, 85px 80px #de4513,
90px 80px #de4513, 95px 80px #de4513;
}

/* Form result display */
#formResult {
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

#formResult p {
  color: var(--text-main);
  margin: 10px 0;
  font-size: 16px;
}
