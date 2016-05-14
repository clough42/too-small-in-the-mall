namespace TooSmall
{
    using System;
    using System.Reflection;
    using System.Runtime.Serialization;

    public class TooSmallBinder : SerializationBinder
    {
        public override Type BindToType(string assemblyName, string typeName) => 
            Assembly.GetExecutingAssembly().GetType(typeName);
    }
}
