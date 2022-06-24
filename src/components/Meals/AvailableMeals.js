import { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(
        'https://react-http-be6eb-default-rtdb.firebaseio.com/meals.json'
      );

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        const { name, description, price } = responseData[key];

        loadedMeals.push({
          id: key,
          name,
          description,
          price,
        });
      }

      setMeals(loadedMeals);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
