# 📋 Workout Logbook App: Current Functionality

## 🏠 Home / Dashboard

- **Bar Graph of Progress:**  
  Shows total reps per month (or selected period: 3 months, 1 year, all time).
- **Period Selector:**  
  Allows user to filter graph data by time period.
- **Theme Selector:**  
  User can open a modal to change the app's theme.
- **Seed/Reset Button:**  
  Button to reset and reseed the database (for development/testing).

---

## 🏋️ Training (Start Workout)

- **Start Empty Workout:**  
  Button to create a new blank workout.
- **Workout Templates:**  
  List of workout templates (workouts with no `startedAt`).
  - Start a workout from a template (duplicates the template as a new workout).
  - Edit or delete templates.
- **Create New Template:**  
  Button to create a new workout template.

---

## 📖 History

- **Completed Workouts List:**  
  Sectioned by month/year.
  - Each workout shows name and number of exercises.
  - Edit or delete completed workouts.
- **Empty State:**  
  Message and button to add a workout if none exist.

---

## 📏 Measurements

- **Measurement Types:**  
  List of measurement types (e.g., Weight, Body Fat, Muscle Mass).
  - Add new measurement types.
- **Measurement Points:**  
  Add new data points to each measurement.
  - Line graph for each measurement type showing progress over time.
- **Modal Forms:**  
  For adding new measurement types and points.

---

## 📝 Exercises

- **Exercise List:**  
  Alphabetically grouped list of all exercises.
  - Tap to view exercise details/analytics.
- **Add/Edit Exercise:**  
  Modal form to add a new exercise or edit an existing one (name, type/category).
- **Exercise Categories:**  
  Supports different types (reps, weighted, duration, distance).

---

## 📊 Exercise Analytics

- **Per-Exercise Detail Page:**  
  Shows graphs for various aggregations (e.g., max weight, total reps, volume, etc.) depending on exercise type.
  - Edit button for exercise.
  - Back navigation.

---

## 🏋️ Workout Logging (Detail/Edit)

- **Workout Detail/Edit Page:**  
  Add/edit workout name.
  - Add/remove exercises and sets.
  - For each set: log reps, weight, time, distance, RPE, and mark as "lifted".
  - Custom keyboard for quick data entry.
  - Save, finish, or delete workout.
  - Timer for active workouts.
  - Support for workout templates.
  - Modal for adding exercises to a workout.
  - Delete individual sets or exercises from a workout.

---

## 🖼️ UI/UX

- **Consistent Padding:**  
  All main content areas use 16px padding for visual consistency.
- **Cards, Modals, and Dropdowns:**  
  Reusable components for clean UI.
- **Theme Support:**  
  User can change the app's color theme.

---

## 🗄️ Data & State

- **Live Queries:**  
  All lists and graphs update in real-time as data changes.
- **Database Seeding:**  
  Developer utility to reset and seed the database with sample data.

---

# 🚩 Summary Table

| Feature Area    | Functionality                                                      |
| --------------- | ------------------------------------------------------------------ |
| Home/Dashboard  | Progress graph, period selector, theme switch, seed/reset          |
| Training        | Start workout, templates, create/edit/delete templates             |
| History         | Completed workouts, edit/delete, empty state                       |
| Measurements    | Add types/points, line graphs, modal forms                         |
| Exercises       | List, add/edit, categories, analytics, grouped by letter           |
| Workout Logging | Add/edit workouts, sets, custom keyboard, timer, templates, delete |
| UI/UX           | Consistent padding, cards, modals, dropdowns, theme support        |
| Data/State      | Live queries, database seeding                                     |
