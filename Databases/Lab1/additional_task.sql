SELECT l.name
FROM location l
JOIN people p ON p.location = l.location_id
JOIN weather_people wp ON wp.person_id = p.person_id
WHERE wp.emotions = 'Испуг';
