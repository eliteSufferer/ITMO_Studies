package servlets;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    private boolean isNotInArr(double[] arr, double param){
        for (double value : arr){
            if (value == param){
                return false;
            }
        }
        return true;
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        final String INVALID_DATA_MSG = "Incorrect, try again) Input the correct data";
        String xValue = request.getParameter("xVal");
        String yValue = request.getParameter("yVal");
        String rValue = request.getParameter("rVal");

//        double[] possibleY = new double[] {-3, -2, -1, 0, 1, 2, 3, 4, 5};
        double[] possibleR = new double[] {1, 1.5, 2, 2.5, 3};
        try {
            if (xValue == null || yValue == null || rValue == null){
                throwError(response, INVALID_DATA_MSG);
                return;
            }

            if (xValue.isEmpty() || yValue.isEmpty() || rValue.isEmpty()){
                throwError(response, INVALID_DATA_MSG);
                return;
            }

            if (Double.parseDouble(xValue) >= 5 || Double.parseDouble(xValue) <= -3
                    || Double.parseDouble(yValue) < -3 || Double.parseDouble(yValue) > 5 ||
//                   || isNotInArr(possibleY, Double.parseDouble(yValue)) ||
                    isNotInArr(possibleR, Double.parseDouble(rValue)))
            {
                throwError(response, INVALID_DATA_MSG);
                return;
            }

            request.getRequestDispatcher("/areaCheck").forward(request, response);
        } catch (Exception e){
            throwError(response, e.toString());
        }
    }
    private void throwError(HttpServletResponse response,  String errorMsg) throws IOException, ServletException {
        Gson json = new Gson();

        Map<String, Object> jsonResponse = new HashMap<>() {{
            put("error", errorMsg);
            put("status", "UNPROCESSABLE_ENTITY");
        }};

        response.setContentType("application/json");
        response.getWriter().write(json.toJson(jsonResponse));
        response.setStatus(422);
    }
}

