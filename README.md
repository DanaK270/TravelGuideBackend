# TravelGuideBackend

## Date: 17/10/2024

### By: Isa Al-Eid, Meryam Mohamed, Dana Al-Ebrahim,and Mohamed Yaqoob.

## [GitHub](https://github.com/DanaK270/TravelGuideFrontend) | [Trello](https://trello.com/invite/b/Zo290k4o/ATTIe8f36953b67be7facaec60e8e900b325A5C92267/travel-guide)

### **_Description_**

---

Welcome to TravelTrove, It is a Comprehensive Platform for Exploring Tourist Destinations. Not only can you plan your trips, but your whole next adventure. You can simply go to the site, and plan most of your trips main parts from hotels, to finding the right adventures.

### **_Features_**

---

#### **_User Features:_**

- Search for countries and view tourist attractions and hotels.
- Rate and comment on places and hotels.

#### **_Admin Features:_**

- Add or delete tourist places, hotels, and countries.
- Manage user comments and ratings.

### **_Technologies_**

---

- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB Atlas

### **_Setup_**

---

1. Clone this repository
2. Install dependencies

```bash
npm install
```

3. Run the app

```bash
npm run dev
```

4. Open http://localhost:#### in your browser

### **_API Documentation_**

---

- **POST /countries**
  - Add new countries
- **GET /countries**
  - Returns a list of countries
- **POST /tourist places**
  - Add new tourist places
- **GET /tourist places**
  - Returns a list of tourist places
- **POST /hotels**
  - Add new hotels with details
- **GET /hotels**
  - Returns a list of hotels
- **GET /hotels/:id**
  - Returns details of an hotels
- **POST /comments**
  - Add new comments for the specefic hotels
- **GET /comments**
  - Returns a list of comments for user
- **POST /register**
  - Registers a new user
- **POST /login**
  - Logs in an existing user
- **GET /profile**

  - Returns user profile

  ### **_Screenshots_**

---

## ERD

![image](https://i.imgur.com/ztNgd2S.png)

## Component Hierarchy

![image](https://i.imgur.com/2Ly3Z44.png)

## Wireframes

![image](https://i.imgur.com/uGqqVD9.png)
![image](https://i.imgur.com/JQpw2I5.png)
![image](https://i.imgur.com/8SJe2cm.png)
![image](https://i.imgur.com/6BizhDT.png)
![image](https://i.imgur.com/98hMYTb.png)
![image](https://i.imgur.com/WQ8I8KU.png)

### **_Future Updates_**

---

- Top 10 rated places/hotels in each country.
- Map integration for visualizing locations of places and hotels.
- Data visualization for user ratings and comments.
- Flight booking and tracking.
- Email verification .
- User experience enhancing features.
- Event/community planning: where the users can arrange events for tourists in a given country.

### **_Acknowledgements_**

---

- [Travel Guide Frontend](https://github.com/DanaK270/TravelGuideFrontend)
