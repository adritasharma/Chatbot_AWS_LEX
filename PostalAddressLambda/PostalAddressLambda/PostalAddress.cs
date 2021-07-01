using System;
using System.Collections.Generic;
using System.Text;

namespace PostalAddressLambda
{
    public class PostalAddress
    {
        public List<PostOffice> PostOffice { get; set; }
    }
    public class PostOffice
    {
        public string Name { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
    }
}
