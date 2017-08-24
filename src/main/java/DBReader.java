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
        JSONObject config = new JSONObject();
        JSONObject providersMapObject=new JSONObject();
        JSONArray adSlots = executeQuery("select * from adSlots where publisherID=" + publisherID);
        JSONObject adSlotsObject=new JSONObject();
        JSONArray providers = executeQuery("select * from providers");
        JSONObject providersObject=new JSONObject();
        for(int i=0,size=providers.length();i<size;i++){

            JSONObject objectINArray=providers.getJSONObject(i);
            providersObject.put(objectINArray.getString("id"),objectINArray);
        }

        for(int i=0,size=adSlots.length();i<size;i++){

            JSONObject objectINArray=adSlots.getJSONObject(i);
            JSONArray adSlotProviders=executeQuery("select * from providersMap where adID="+objectINArray.getInt("adID"));
            providersMapObject.put(objectINArray.getString("adID"),adSlotProviders);

            adSlotsObject.put(objectINArray.getString("adID"),objectINArray);

        }
        config.put("adSlots", adSlotsObject);
        config.put("providers", providersObject);
        config.put("providersMap",providersMapObject);
        return config.toString();

    }


}
