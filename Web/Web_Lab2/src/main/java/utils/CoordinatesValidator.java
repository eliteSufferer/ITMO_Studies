package utils;

import servlets.ControllerServlet;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CoordinatesValidator {

    private final double x, y, r;

    public CoordinatesValidator(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean validate(){
        return checkX() && checkY() && checkR();
    }

    private boolean checkX(){
        return -3 < x && x < 5;
    }

    private boolean checkY(){
        List<Integer> possibleY = Arrays.asList(-3, -2, -1, 0, 1, 2, 3, 4, 5);
        return possibleY.contains((int) y) && y == (int) y;
    }

    private boolean checkR(){
        List<? extends Number> possibleR = Arrays.asList(1, 1.5, 2, 2.5, 3);
        return possibleR.contains(r);
    }
}
