/**
 * Created by ghanshyam.y on 17/08/17.
 */

import static spark.Spark.*;
import org.json.*;
import java.io.*;
import org.apache.log4j.BasicConfigurator;

public class Main {

    public static void main(String [] args) throws Exception
    {

        BasicConfigurator.configure();
        DBReader dbReader=new DBReader();
        String absolutePath=new File("").getAbsolutePath()+"/";
        port(5666);

        initExceptionHandler((e) -> System.out.println("Uh-oh"));
        get("/helloo",(req,res)->"Hello World!");


       get("/publisher",(req,res)-> {


           String config = dbReader.getConfig(Integer.valueOf(req.queryParams("id")));
           //return config + new Scanner(new File(new File("").getAbsolutePath()+"/src/main/java/core.js")).useDelimiter("\\Z").next();

           return "var config="+config+";"
                   +FileReader((absolutePath+ "src/main/Client/ModuleManager.js"))
                   +FileReader((absolutePath+ "src/main/Logs/LogModule.js"))



                   +FileReader((absolutePath+ "src/main/Logs/BidsResponseLog.js"))
                   +FileReader((absolutePath+ "src/main/Logs/AuctionResponseLog.js"))
                   +FileReader((absolutePath+ "src/main/Logs/RenderedAdLog.js"))
                   +FileReader((absolutePath+ "src/main/Logs/LogManager.js"))
                   +FileReader((absolutePath+ "src/main/Client/SlotAuction.js"))
                   +FileReader((absolutePath+ "src/main/Client/AuctionManager.js"))
                   +FileReader((absolutePath+ "src/main/Client/Adapter.js"))
                   +FileReader((absolutePath+ "src/main/Client/AdapterManager.js"))



                   +FileReader((absolutePath+ "src/main/Client/core.js"));





       });

       get("/addLogs",(req,res)->{


           dbReader.addLogs(new JSONObject(req.queryParams("log")));
           return 0;
       });

       get("/getPublishers",(req,res)->{

           //res.header("Access-Control-Allow-Origin", "*");
           return req.queryParams("callback").toString()+"("+dbReader.getAllPublishers()+")";
       });

       get("/getProviders",(req,res)->{

           return req.queryParams("callback").toString()+"("+dbReader.getAllProviders()+")";
       });

       get("/getAdSlots",(req,res)->{

        System.out.println("publisher");
        System.out.println(Integer.parseInt(req.queryParams("publisherID")));
        return req.queryParams("callback").toString()+"("+dbReader.getAdSlots(Integer.parseInt(req.queryParams("publisherID")))+")";

    });
        get("/getProvidersMap",(req,res)->{

            //System.out.println("publisher");
            System.out.println(Integer.parseInt(req.queryParams("adID")));
            return req.queryParams("callback").toString()+"("+dbReader.getProvidersMap(Integer.parseInt(req.queryParams("adID")))+")";

        });
       get("/addAdSlot",(req,res)->{
           System.out.println(req.queryParams("adSlots"));
           return req.queryParams("callback").toString()+"("+dbReader.addAdSlot(new JSONObject(req.queryParams("adSlots")))+")";
       });

        get("/updateAdSlot",(req,res)->{
            System.out.println(req.queryParams("adSlots"));
            return req.queryParams("callback").toString()+"("+dbReader.updateAdSlot(new JSONObject(req.queryParams("adSlots")))+")";
        });

      get("/addPublisher",(req,res)->{
          System.out.println(req.queryParams("publisher"));
           return req.queryParams("callback").toString()+"("+dbReader.addNewPublisher(new JSONObject(req.queryParams("publisher")))+")";
       });

        get("/updatePublisher",(req,res)->{
            System.out.println(req.queryParams("publisher"));
            return req.queryParams("callback").toString()+"("+dbReader.updatePublisher(new JSONObject(req.queryParams("publisher")))+")";
        });
       get("/addProvider",(req,res)->{
           return req.queryParams("callback").toString()+"("+dbReader.addNewProvider(new JSONObject(req.queryParams("provider")))+")";

       });
        get("/updateProvider",(req,res)->{
            return req.queryParams("callback").toString()+"("+dbReader.updateProvider(new JSONObject(req.queryParams("provider")))+")";

        });
       get("/addProvidersMap",(req,res)->{

           return req.queryParams("callback").toString()+"("+dbReader.addProvidersMap(new JSONObject(req.queryParams("providersMap")))+")";
       });
        get("/updateProvidersMap",(req,res)->{

            return req.queryParams("callback").toString()+"("+dbReader.updateProvidersMap(new JSONObject(req.queryParams("providersMap")))+")";
        });


       get("/adminJS",(req,res)->{
           return FileReader((absolutePath+ "src/main/admin/admin.js"))
                   +FileReader((absolutePath+ "src/main/admin/adminPublishers.js"))
                   +FileReader((absolutePath+ "src/main/admin/adminProviders.js"))
                   +FileReader((absolutePath+ "src/main/admin/adminAdSlots.js"))
                   +FileReader((absolutePath+ "src/main/admin/adminProvidersMap.js"));


       });


    }

    private static String FileReader(String pathToFile) throws Exception
    {
        File file = new File(pathToFile);

        FileInputStream fileInputStream = null;
        String fileContent = "";

        try {
            fileInputStream = new FileInputStream(file);
            int content;
            while ((content = fileInputStream.read()) != -1) {
                // convert to char and display it
                fileContent += (char) content;
            }


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileInputStream != null)
                    fileInputStream.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return fileContent;
    }



}

/*
import static spark.Spark.*;
public class Main {

    public static void main(String [] args)
    {

        port(5551);
        initExceptionHandler((e) -> System.out.println("Uh-oh"));
        get("/hello",(req,res)->"Hello World!");
        get("/admin",(req,res)->{
            return 1;
        });
    }
}*/
