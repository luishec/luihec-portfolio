@@ .. @@
       transition={{ duration: 0.5 }}
-      className="min-h-screen bg-gray-50"
+      className="min-h-screen bg-gray-900"
     >
       <div className="container-custom py-8">
-        <div className="bg-white rounded-lg shadow-md mb-8">
-          <div className="p-6 border-b border-gray-200">
+        <div className="bg-gray-800 rounded-lg shadow-md mb-8">
+          <div className="p-6 border-b border-gray-700">
             <div className="flex justify-between items-center">
-              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
+              <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
               <button
                 onClick={() => supabase.auth.signOut()}
                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
@@ .. @@
           </div>
           
-          <div className="p-4 sm:p-6 border-b border-gray-200">
+          <div className="p-4 sm:p-6 border-b border-gray-700">
             <div className="flex flex-wrap gap-2">
               <TabButton
                 label="Photos"
@@ .. @@
           </div>
         </div>

-        <div className="bg-white rounded-lg shadow-md p-6">
+        <div className="bg-gray-800 rounded-lg shadow-md p-6">
           {activeTab === 'photos' && <PhotoManager />}
           {activeTab === 'categories' && <CategoryManager />}
@@ .. @@
       className={`px-4 py-2 rounded-md transition-colors ${
         active 
-          ? 'bg-accent-600 text-white' 
-          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
+          ? 'bg-primary-600 text-white' 
+          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
       }`}
     >