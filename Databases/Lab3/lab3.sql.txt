CREATE OR REPLACE FUNCTION get_avg_wind_speed_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
  avg_speed FLOAT;
BEGIN
  SELECT AVG(speed) INTO avg_speed
  FROM weather_location_db
  JOIN weather ON weather_location_db.weather_id = weather.weather_id
  WHERE location_db_id = NEW.location_db_id AND description = 'wind';
  
RAISE NOTICE 'Средняя скорость ветра в локации % = %', NEW.location_db_id, avg_speed;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER get_avg_wind_speed_trigger
AFTER INSERT ON weather_location_db
FOR EACH ROW
EXECUTE FUNCTION get_avg_wind_speed_trigger_func();
