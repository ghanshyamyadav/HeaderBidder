import java.sql.*;

import org.json.*;


public class  DBReader {


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

        JSONObject adSlotsObject=getAdSlotsObject(publisherID);
        JSONObject providersObject=getProvidersObject();
        JSONObject providersMapObject=getProvidersMapObject(adSlotsObject);

        config.put("adSlots", adSlotsObject);
        config.put("providers", providersObject);
        config.put("providersMap",providersMapObject);
        return config.toString();

    }

    private JSONObject getProvidersObject() throws Exception{

        JSONArray providers = executeQuery("select * from providers");
        JSONObject providersObject=new JSONObject();
        for(int i=0,size=providers.length();i<size;i++){

            JSONObject objectINArray=providers.getJSONObject(i);
            providersObject.put(objectINArray.getString("id"),objectINArray);
        }
        return providersObject;

    }

    private JSONObject getAdSlotsObject(int publisherID) throws Exception{

        JSONArray adSlots = executeQuery("select * from adSlots where publisherID=" + publisherID);
        JSONObject adSlotsObject=new JSONObject();
        for(int i=0,size=adSlots.length();i<size;i++){

            JSONObject objectINArray=adSlots.getJSONObject(i);
            adSlotsObject.put(objectINArray.getString("adID"),objectINArray);

        }
        return adSlotsObject;
    }


    private  JSONObject getProvidersMapObject(JSONObject adSlotsObject) throws Exception{


        JSONObject providersObject=new JSONObject();
        JSONArray adSlots=adSlotsObject.names();

        for(int i=0,size=adSlots.length();i<size;i++){
            System.out.println(adSlots.get(i)+"hi");

            JSONObject objectINArray=adSlotsObject.getJSONObject(adSlots.getString(i));
            JSONObject jsonObject=new JSONObject();
            JSONArray adSlotProviders=executeQuery("select * from providersMap where adID="+adSlots.getString(i));
            for(int j=0,sizeArray=adSlotProviders.length();j<sizeArray;j++){

                jsonObject.put(adSlotProviders.getJSONObject(j).getString("prID"),adSlotProviders.getJSONObject(j));

            }
            providersObject.put(adSlots.getString(i),jsonObject);


        }
        return providersObject;


    }


}
