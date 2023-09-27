package models;

import models.Point;

import java.util.ArrayList;
import java.util.List;

public class ResultBean {

    private List<Point> results;

    public ResultBean(){
        results = new ArrayList<>();
    }

    public List<Point> getResults(){
        return results;
    }

    public void addResults(Point results){
        this.results.add(results);
    }
}
