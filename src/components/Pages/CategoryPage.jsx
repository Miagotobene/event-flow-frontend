import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventsByCategory } from '../../services/apiServices'; // Adjust the import path accordingly

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await fetchEventsByCategory(categoryName);
            setEvents(eventsData);
        };

        fetchEvents();
    }, [categoryName]);

    return (
        <div>
            <h1>Category: {categoryName}</h1>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>{event.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
