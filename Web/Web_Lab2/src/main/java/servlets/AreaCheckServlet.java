package servlets;

import com.google.gson.Gson;
import models.Point;
import models.ResultBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        try {
            double x = Double.parseDouble(request.getParameter("xVal"));
            double y = Double.parseDouble(request.getParameter("yVal"));
            double r = Double.parseDouble(request.getParameter("rVal"));

            Point point = new Point(x, y, r);

            HttpSession session = request.getSession();
            ResultBean resultBean = (ResultBean) session.getAttribute("resultBean");
            if (resultBean == null){
                resultBean = new ResultBean();
                session.setAttribute("resultBean", resultBean);
            }

            resultBean.addResults(point);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String tableRes = point.isInArea() ? "In" : "Out";
            response.getWriter().write("{\"result\":\"" + tableRes + "\"}");

        } catch (Exception e){
            request.getRequestDispatcher("./index.jsp").forward(request, response);
        }

    }
}
