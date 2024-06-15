using MANTRA;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace fingerprint_project
{
    static class Program
    {
        static async Task Main(string[] args)
        {
            if (args.Length > 0)
            {

                string command = args[0];

                if (command == "register")
                {
                    int arg2AsInt = int.Parse(args[1]);
                    await RegisterAsync(arg2AsInt);
                }
                else if (command == "login")
                {
                    int t = int.Parse(args[1]);

                    Login(t);

                }
                else
                {
                    Console.WriteLine("Invalid command.");
                }
            }
            else
            {
                Console.WriteLine("No command specified.");
            }
        }
        static async Task RegisterAsync(int patientId)
        {
            try
            {
                MFS100 mfs100 = new MFS100();
                int ret = mfs100.Init();
                if (ret != 0)
                {
                    Console.WriteLine("Device initialization failed: " + mfs100.GetErrorMsg(ret));
                    return;
                }
                else
                {
                    Console.WriteLine("Device initialized successfully at register");
                }

                string datapath = AppDomain.CurrentDomain.BaseDirectory;
                var client = new MongoClient("mongodb+srv://dharshinikarthik06:KN6zPSPlcVaHaiQC@emergencyresponse.pmghcdc.mongodb.net");
                var database = client.GetDatabase("medical");
                var collection = database.GetCollection<BsonDocument>("Patient");
           
                FingerData fingerprintdata1 = null;
                int ret1 = mfs100.AutoCapture(ref fingerprintdata1, 300000000, true, true);
                while (ret1 != 0)
                {
                    ret1 = mfs100.AutoCapture(ref fingerprintdata1, 300000000, true, true);
                }
                if (ret1 != 0)
                {
                    Console.WriteLine("Fingerprint capture failed.");
                    return;
                }

                var fingerprintBuffer = new BsonBinaryData(fingerprintdata1.ISOTemplate);
                var filter = Builders<BsonDocument>.Filter.Eq("patientId", patientId);
                var update = Builders<BsonDocument>.Update.Set("ISOTemplate", fingerprintBuffer);

                var res = await collection.UpdateOneAsync(filter, update);
                if (res != null && res.ModifiedCount > 0)
                {
                    Console.WriteLine("Fingerprint data updated successfully.");
                }
                else
                {
                    Console.WriteLine("Fingerprint data update failed.");
                }

                System.IO.File.WriteAllBytes(datapath + "//ISOTemplate1.iso", fingerprintdata1.ISOTemplate);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }
        }


        static void Login(int patientIdlen)
        {
            MFS100 mfs100 = new MFS100();
            int ret = mfs100.Init();
            if (ret != 0)
            {
                Console.WriteLine(mfs100.GetErrorMsg(ret), true);
            }
            /*else
            {
                Console.WriteLine("Device initialized successfully");
            }*/
            string datapath = AppDomain.CurrentDomain.BaseDirectory;
            var client = new MongoClient("mongodb+srv://dharshinikarthik06:KN6zPSPlcVaHaiQC@emergencyresponse.pmghcdc.mongodb.net");
            var database = client.GetDatabase("medical");
            var collection = database.GetCollection<BsonDocument>("Patient");
            FingerData fingerprintdata2 = null;
            int ret2 = mfs100.AutoCapture(ref fingerprintdata2, 30000000, true, true);
            while (ret2 != 0)
            {
                // Console.WriteLine("Place again");
                ret2 = mfs100.AutoCapture(ref fingerprintdata2, 300000000, true, true);
            }
            System.IO.File.WriteAllBytes(datapath + "//ISOTemplate2.iso", fingerprintdata2.ISOTemplate);
            byte[] template2 = System.IO.File.ReadAllBytes(datapath + "//ISOTemplate2.iso");
            int patientId = 1, flag = 1, score = 0;
            while (patientId <= patientIdlen)
            {
                var filter = Builders<BsonDocument>.Filter.Eq("patientId", patientId);
                var document = collection.Find(filter).FirstOrDefault();
                byte[] template1 = document["ISOTemplate"].AsByteArray;


                if (ret2 == 0)
                {

                    int ret3 = mfs100.MatchISO(template1, template2, ref score);
                    if (ret3 == 0)
                    {

                        if (score >= 1400)
                        {
                            flag = 0;
                            var username = document.GetValue("username").AsString;
                            Console.WriteLine($"{username}");
                        }
                    }
                }
                patientId += 1;
            }
            if (flag == 1)
            {
                Console.WriteLine("No match found!!");
            }
            int v = Console.Read();
            return;
        }


    }
}