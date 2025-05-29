import { Button } from "@zygo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@zygo/ui/card";
import { Input } from "@zygo/ui/input";
import { Textarea } from "@zygo/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-zygo-mint/20 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get in <span className="text-zygo-red">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to join the Zygo family? Have questions about our platform? 
              We'd love to hear from you and help you start your family growth journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Send us a message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="Enter your first name" className="border-zygo-red/30 focus:border-zygo-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Enter your last name" className="border-zygo-red/30 focus:border-zygo-red" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email address" className="border-zygo-red/30 focus:border-zygo-red" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <Input placeholder="What's this about?" className="border-zygo-red/30 focus:border-zygo-red" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us how we can help your family grow..." 
                      className="border-zygo-red/30 focus:border-zygo-red min-h-[120px]" 
                    />
                  </div>
                  <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Send Message
                    <Send className="ml-2" size={20} />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-zygo-yellow/20 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Mail className="text-zygo-red mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600">hello@zygo.app</p>
                  <p className="text-gray-600">support@zygo.app</p>
                </CardContent>
              </Card>

              <Card className="bg-zygo-blue/20 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Phone className="text-zygo-red mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-ZYGO</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                </CardContent>
              </Card>

              <Card className="bg-zygo-mint/30 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <MapPin className="text-zygo-red mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Family Growth Lane</p>
                  <p className="text-gray-600">Community City, CC 12345</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
