package servlets;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebFilter(urlPatterns = "/*")
public class NotFoundFilter implements Filter {
    Set<String> allowedUrls;
    @Override
    public void init(FilterConfig filterConfig) {
        allowedUrls = new HashSet<>();
        allowedUrls.add("/Web_Lab2/");
        allowedUrls.add("/Web_Lab2/index.jsp");
        allowedUrls.add("/Web_Lab2/styles/main.css");
        allowedUrls.add("/Web_Lab2/scripts/drawing.js");
        allowedUrls.add("/Web_Lab2/scripts/sendRequest.js");
        allowedUrls.add("/Web_Lab2/scripts/render.js");
        allowedUrls.add("/Web_Lab2/scripts/Validator.js");
        allowedUrls.add("/Web_Lab2/notfound.jsp");
        allowedUrls.add("/Web_Lab2/controller");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String requestURI = request.getRequestURI();

        System.out.println(requestURI);
        if (allowedUrls.contains(requestURI)) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            RequestDispatcher dispatcher = request.getRequestDispatcher("/notfound.jsp");
            dispatcher.forward(request, response);
        }
    }


    @Override
    public void destroy() {
    }

}