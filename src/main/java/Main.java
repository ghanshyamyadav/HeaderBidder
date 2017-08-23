/**
 * Created by ghanshyam.y on 17/08/17.
 */

import static spark.Spark.*;
import org.json.*;
import java.io.*;
import org.apache.log4j.BasicConfigurator;
import java.util.Scanner;

public class Main {

    public static void main(String [] args) throws Exception
    {

        BasicConfigurator.configure();
        DBReader dbReader=new DBReader();
        String absolutePath=new File("").getAbsolutePath()+"/src/main/java/";
        port(5666);

        initExceptionHandler((e) -> System.out.println("Uh-oh"));
        get("/helloo",(req,res)->"Hello World!");

        get("/admin",(req,res)->{
            JSONArray  jsonArray=dbReader.executeQuery("select * from providers");
            return jsonArray;
        });

       get("/publisher",(req,res)-> {


           String config = dbReader.getConfig(Integer.valueOf(req.queryParams("id")));
           //return config + new Scanner(new File(new File("").getAbsolutePath()+"/src/main/java/core.js")).useDelimiter("\\Z").next();

           return "var config="+config+";"
                   +FileReader((absolutePath+"ModuleManager.js"))
                   +FileReader((absolutePath+"core.js"))
                   +FileReader((absolutePath+"AuctionManager.js"))
                   +FileReader((absolutePath+"SlotAuction.js"))
                   +FileReader((absolutePath+"AdapterManager.js"))
                   +FileReader((absolutePath+"Adapter.js"));


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
