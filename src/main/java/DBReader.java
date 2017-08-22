import java.sql.*;

import org.json.*;


public class DBReader {


    private Statement statement;

    public DBReader() throws Exception {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/HeaderBidder", "root", "");
        statement = connection.createStatement();
    }

    public JSONArray executeQuery(String query) throws Exception {
        return getJson(statement.executeQuery(query));
    }

    private JSONArray getJson(ResultSet rs)
            throws SQLException, JSONException {
        JSONArray json = new JSONArray();
        ResultSetMetaData rsmd = rs.getMetaData();
        while (rs.next()) {
            int numColumns = rsmd.getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 1; i <= numColumns; i++) {
                String column_name = rsmd.getColumnName(i);
                obj.put(column_name, rs.getObject(column_name));
            }
            json.put(obj);
        }
        return json;
    }

    public String getConfig(int publisherID) throws Exception {
        JSONObject jsonObject = new JSONObject();
        JSONArray adSlots = executeQuery("select * from placements where publisherID=" + publisherID);
        JSONArray providers = executeQuery("select * from providers");
        jsonObject.put("adSlots", adSlots);
        jsonObject.put("providers", providers);
        return jsonObject.toString();

    }


}
