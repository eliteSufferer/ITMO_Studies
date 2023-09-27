package models;

import java.util.Objects;

public class Point {
    private final double x;
    private final double y;
    private final double r;

    private final boolean inArea;

    private boolean circle(double x, double y, double r){
        return ((Math.pow(x, 2)) + Math.pow(y, 2) <= Math.pow(r, 2));
    }

    private boolean triangle(double x, double y, double r){
        return (x >= 0) && (y >= 0) && (x <= r) && (y <= r) && (y <= (r - x));
    }

    private boolean rectangle(double x, double y, double r){
        return (0 >= x && x >= -r && y <= 0 && y >= -r);
    }


    public Point(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea(x, y, r);
    }

    private boolean inArea(double x, double y, double r){
        if (x > 0 && y > 0){
            return triangle(x, y, r);
        }

        if (x < 0 && y > 0){
            return circle(x, y, r);
        }

        if (x < 0 && y < 0){
            return rectangle(x, y, r);
        }

        return (x == 0 && y <= r && y >= -r) || (y == 0 && x <= r && x >= -r);
    }

    public double getX(){
        return x;
    }

    public double getY(){
        return y;
    }

    public double getR(){
        return r;
    }

    public boolean isInArea(){
        return inArea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && Double.compare(y, point.y) == 0 && r == point.r;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r);
    }

    @Override
    public String toString() {
        return "models.Point{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isInArea=" + inArea +
                '}';
    }
}
